import type {
  Feature,
  FeatureCollection,
  GeoJsonObject,
  Geometry,
  GeometryCollection,
  LineString,
  MultiLineString,
  MultiPoint,
  MultiPolygon,
  Point,
  Polygon,
  Position,
} from "geojson";
import {
  area as turfArea,
  bbox as turfBbox,
  centerOfMass,
  centroid as turfCentroid,
  featureCollection,
  length as turfLength,
} from "@turf/turf";

export type Coordinates = {
  lat: number;
  lon: number;
};

export type PolygonMetrics = {
  areaSqMeters: number | null;
  areaHectares: number | null;
  centroid: Coordinates | null;
  bbox: [number, number, number, number] | null;
  message: string;
};

export const HECTARES_PER_SQUARE_METER = 0.0001;

const isFeatureCollection = (
  value: GeoJsonObject
): value is FeatureCollection => value.type === "FeatureCollection";

const isFeature = (value: GeoJsonObject): value is Feature =>
  value.type === "Feature";

const isGeometryCollection = (value: Geometry): value is GeometryCollection =>
  value.type === "GeometryCollection";

const isPolygon = (value: Geometry): value is Polygon =>
  value.type === "Polygon";

const isMultiPolygon = (value: Geometry): value is MultiPolygon =>
  value.type === "MultiPolygon";

const isLineString = (value: Geometry): value is LineString =>
  value.type === "LineString";

const isMultiLineString = (value: Geometry): value is MultiLineString =>
  value.type === "MultiLineString";

const isPoint = (value: Geometry): value is Point => value.type === "Point";

const isMultiPoint = (value: Geometry): value is MultiPoint =>
  value.type === "MultiPoint";

const isLineStringClosed = (lineString: LineString): boolean => {
  const coords = lineString.coordinates;
  if (coords.length < 4) return false; // Need at least 4 points for a closed ring

  const first = coords[0];
  const last = coords[coords.length - 1];

  if (!first || !last || first.length < 2 || last.length < 2) return false;

  const firstLon = first[0];
  const firstLat = first[1];
  const lastLon = last[0];
  const lastLat = last[1];

  if (
    firstLon === undefined ||
    firstLat === undefined ||
    lastLon === undefined ||
    lastLat === undefined
  ) {
    return false;
  }

  // Check if first and last points are the same (with small tolerance for floating point)
  const tolerance = 1e-10;
  return (
    Math.abs(firstLon - lastLon) < tolerance &&
    Math.abs(firstLat - lastLat) < tolerance
  );
};

const lineStringToPolygon = (lineString: LineString): Polygon | null => {
  if (!isLineStringClosed(lineString)) return null;

  // Convert closed LineString to Polygon
  // A Polygon is an array of LinearRings, where the first is the exterior ring
  return {
    type: "Polygon",
    coordinates: [lineString.coordinates],
  };
};

const toFeature = (geometry: Geometry): Feature<Geometry> => ({
  type: "Feature",
  geometry,
  properties: {},
});

export const extractPolygonFeatures = (
  input: GeoJsonObject
): Feature<Polygon | MultiPolygon>[] => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPolygonFeatures(feature));
  }

  if (isFeature(input)) {
    const geometry = input.geometry;
    if (!geometry) return [];

    if (isGeometryCollection(geometry)) {
      return geometry.geometries.flatMap((subGeometry) =>
        extractPolygonFeatures(toFeature(subGeometry))
      );
    }

    if (isPolygon(geometry) || isMultiPolygon(geometry)) {
      return [input as Feature<Polygon | MultiPolygon>];
    }

    return [];
  }

  const geometry = input as Geometry;

  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap((subGeometry) =>
      extractPolygonFeatures(toFeature(subGeometry))
    );
  }

  if (isPolygon(geometry) || isMultiPolygon(geometry)) {
    return [toFeature(geometry) as Feature<Polygon | MultiPolygon>];
  }

  return [];
};

export const extractLineStringFeatures = (
  input: GeoJsonObject
): Feature<LineString | MultiLineString>[] => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) =>
      extractLineStringFeatures(feature)
    );
  }

  if (isFeature(input)) {
    const geometry = input.geometry;
    if (!geometry) return [];

    if (isGeometryCollection(geometry)) {
      return geometry.geometries.flatMap((subGeometry) =>
        extractLineStringFeatures(toFeature(subGeometry))
      );
    }

    if (isLineString(geometry) || isMultiLineString(geometry)) {
      return [input as Feature<LineString | MultiLineString>];
    }

    return [];
  }

  const geometry = input as Geometry;

  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap((subGeometry) =>
      extractLineStringFeatures(toFeature(subGeometry))
    );
  }

  if (isLineString(geometry) || isMultiLineString(geometry)) {
    return [toFeature(geometry) as Feature<LineString | MultiLineString>];
  }

  return [];
};

export const extractPointFeatures = (
  input: GeoJsonObject
): Feature<Point | MultiPoint>[] => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPointFeatures(feature));
  }

  if (isFeature(input)) {
    const geometry = input.geometry;
    if (!geometry) return [];

    if (isGeometryCollection(geometry)) {
      return geometry.geometries.flatMap((subGeometry) =>
        extractPointFeatures(toFeature(subGeometry))
      );
    }

    if (isPoint(geometry) || isMultiPoint(geometry)) {
      return [input as Feature<Point | MultiPoint>];
    }

    return [];
  }

  const geometry = input as Geometry;

  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap((subGeometry) =>
      extractPointFeatures(toFeature(subGeometry))
    );
  }

  if (isPoint(geometry) || isMultiPoint(geometry)) {
    return [toFeature(geometry) as Feature<Point | MultiPoint>];
  }

  return [];
};

const computeCentroid = (
  features: Feature<Polygon | MultiPolygon>[]
): Position | null => {
  if (features.length === 0) return null;

  const collection = featureCollection(features);

  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turfCentroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};

const computeCentroidForLineStrings = (
  features: Feature<LineString | MultiLineString>[]
): Position | null => {
  if (features.length === 0) return null;

  const collection = featureCollection(features);

  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turfCentroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};

const computeCentroidForPoints = (
  features: Feature<Point | MultiPoint>[]
): Position | null => {
  if (features.length === 0) return null;

  const collection = featureCollection(features);

  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turfCentroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};

const computeCentroidForMixed = (
  features: Feature<Geometry>[]
): Position | null => {
  if (features.length === 0) return null;

  const collection = featureCollection(features);

  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = turfCentroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};

export const computePolygonMetrics = (
  geoJson: GeoJsonObject
): PolygonMetrics => {
  const polygonFeatures = extractPolygonFeatures(geoJson);
  const lineStringFeatures = extractLineStringFeatures(geoJson);
  const pointFeatures = extractPointFeatures(geoJson);

  // Try to convert closed LineStrings to Polygons
  const convertedPolygons: Feature<Polygon>[] = [];
  for (const lineStringFeature of lineStringFeatures) {
    if (lineStringFeature.geometry.type === "LineString") {
      const polygon = lineStringToPolygon(lineStringFeature.geometry);
      if (polygon) {
        convertedPolygons.push({
          type: "Feature",
          geometry: polygon,
          properties: lineStringFeature.properties,
        });
      }
    } else if (lineStringFeature.geometry.type === "MultiLineString") {
      // Handle MultiLineString - convert each closed LineString
      for (const lineString of lineStringFeature.geometry.coordinates) {
        const ls: LineString = { type: "LineString", coordinates: lineString };
        const polygon = lineStringToPolygon(ls);
        if (polygon) {
          convertedPolygons.push({
            type: "Feature",
            geometry: polygon,
            properties: lineStringFeature.properties,
          });
        }
      }
    }
  }

  // Combine original polygons with converted ones
  const allPolygonFeatures = [...polygonFeatures, ...convertedPolygons];

  // Handle Point geometries only
  if (
    pointFeatures.length > 0 &&
    allPolygonFeatures.length === 0 &&
    lineStringFeatures.length === 0
  ) {
    const centroidPosition = computeCentroidForPoints(pointFeatures);
    const bbox = turfBbox(featureCollection(pointFeatures)) as [
      number,
      number,
      number,
      number
    ];

    let centroid: Coordinates | null = null;

    if (
      centroidPosition &&
      centroidPosition[0] !== undefined &&
      centroidPosition[1] !== undefined
    ) {
      const [lon, lat] = centroidPosition;
      centroid = { lat, lon };
    }

    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid,
      bbox,
      message: centroid ? "Success (Point)" : "Centroid calculation failed",
    };
  }

  // Handle LineString geometries (including closed ones that were converted)
  if (lineStringFeatures.length > 0 && allPolygonFeatures.length === 0) {
    const lengthMeters = lineStringFeatures.reduce(
      (acc, feature) => acc + turfLength(feature, { units: "meters" }),
      0
    );

    const centroidPosition = computeCentroidForLineStrings(lineStringFeatures);
    const bbox = turfBbox(featureCollection(lineStringFeatures)) as [
      number,
      number,
      number,
      number
    ];

    let centroid: Coordinates | null = null;

    if (
      centroidPosition &&
      centroidPosition[0] !== undefined &&
      centroidPosition[1] !== undefined
    ) {
      const [lon, lat] = centroidPosition;
      centroid = { lat, lon };
    }

    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid,
      bbox,
      message: centroid
        ? "Success (LineString)"
        : "Centroid calculation failed",
    };
  }

  // Handle mixed geometries (Polygon, LineString, and/or Point)
  const hasPolygons = allPolygonFeatures.length > 0;
  const hasLineStrings = lineStringFeatures.length > 0;
  const hasPoints = pointFeatures.length > 0;
  const geometryTypeCount =
    (hasPolygons ? 1 : 0) + (hasLineStrings ? 1 : 0) + (hasPoints ? 1 : 0);

  if (geometryTypeCount > 1) {
    const areaSqMeters = allPolygonFeatures.reduce(
      (acc, feature) => acc + turfArea(feature),
      0
    );

    const allFeatures = [
      ...allPolygonFeatures,
      ...lineStringFeatures,
      ...pointFeatures,
    ] as Feature<Geometry>[];

    const centroidPosition = computeCentroidForMixed(allFeatures);
    const bbox = turfBbox(featureCollection(allFeatures)) as [
      number,
      number,
      number,
      number
    ];

    let centroid: Coordinates | null = null;

    if (
      centroidPosition &&
      centroidPosition[0] !== undefined &&
      centroidPosition[1] !== undefined
    ) {
      const [lon, lat] = centroidPosition;
      centroid = { lat, lon };
    }

    const typeLabels = [];
    if (hasPolygons) typeLabels.push("Polygon");
    if (hasLineStrings) typeLabels.push("LineString");
    if (hasPoints) typeLabels.push("Point");

    return {
      areaSqMeters,
      areaHectares: areaSqMeters * HECTARES_PER_SQUARE_METER,
      centroid,
      bbox,
      message: centroid
        ? `Success (mixed: ${typeLabels.join(", ")})`
        : "Centroid calculation failed",
    };
  }

  // Handle Polygon geometries only (including converted closed LineStrings)
  if (
    allPolygonFeatures.length === 0 &&
    lineStringFeatures.length === 0 &&
    pointFeatures.length === 0
  ) {
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: null,
      bbox: null,
      message: "No polygons found",
    };
  }

  const areaSqMeters = allPolygonFeatures.reduce(
    (acc, feature) => acc + turfArea(feature),
    0
  );

  const centroidPosition = computeCentroid(allPolygonFeatures);
  const bbox = turfBbox(featureCollection(allPolygonFeatures)) as [
    number,
    number,
    number,
    number
  ];

  let centroid: Coordinates | null = null;

  if (
    centroidPosition &&
    centroidPosition[0] !== undefined &&
    centroidPosition[1] !== undefined
  ) {
    const [lon, lat] = centroidPosition;
    centroid = { lat, lon };
  }

  return {
    areaSqMeters,
    areaHectares: areaSqMeters * HECTARES_PER_SQUARE_METER,
    centroid,
    bbox,
    message: centroid ? "Success" : "Centroid calculation failed",
  };
};

export const toFeatureCollection = (
  geoJson: GeoJsonObject
): FeatureCollection => {
  if (isFeatureCollection(geoJson)) return geoJson;

  if (isFeature(geoJson)) {
    return featureCollection([geoJson]);
  }

  return featureCollection([toFeature(geoJson as Geometry)]);
};
