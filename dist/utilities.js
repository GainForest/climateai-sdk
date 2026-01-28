import { BlobRef } from '@atproto/api';
import superjson from 'superjson';
import z from 'zod';
import { CID } from 'multiformats/cid';
import { bbox, featureCollection, length, area, centerOfMass, centroid } from '@turf/turf';

// src/_internal/utilities/atproto/getBlobUrl.ts
var getBlobUrl = (did, imageData, pdsDomain) => {
  if (typeof imageData === "string") {
    const imageUrl = new URL(imageData);
    return imageUrl.toString();
  }
  const isBlobRef = imageData instanceof BlobRef || "ref" in imageData && "mimeType" in imageData && "size" in imageData;
  if (isBlobRef) {
    const ref = imageData.ref;
    const cid = typeof ref === "string" ? ref : ref?.$link ?? String(ref);
    const encodedCid = encodeURIComponent(cid);
    return `https://${pdsDomain}/xrpc/com.atproto.sync.getBlob?did=${did}&cid=${encodedCid}`;
  }
  if (imageData.$type === "app.gainforest.common.defs#uri" || imageData.$type === "org.hypercerts.defs#uri") {
    return imageData.uri;
  }
  if (imageData.$type === "org.hypercerts.defs#smallBlob" || imageData.$type === "org.hypercerts.defs#largeBlob") {
    return getBlobUrl(did, imageData.blob, pdsDomain);
  }
  if (imageData.$type === "org.hypercerts.defs#smallImage" || imageData.$type === "org.hypercerts.defs#largeImage") {
    return getBlobUrl(did, imageData.image, pdsDomain);
  }
  if (imageData.$type === "app.gainforest.common.defs#image" || imageData.$type === "app.gainforest.common.defs#imageThumbnail") {
    return getBlobUrl(did, imageData.file, pdsDomain);
  }
  if ("blob" in imageData) {
    return getBlobUrl(did, imageData.blob, pdsDomain);
  }
  if ("image" in imageData) {
    return getBlobUrl(did, imageData.image, pdsDomain);
  }
  if ("file" in imageData) {
    return getBlobUrl(did, imageData.file, pdsDomain);
  }
  if ("uri" in imageData) {
    return imageData.uri;
  }
  const imageDataTypeCheck = imageData;
  return imageDataTypeCheck;
};

// src/_internal/utilities/atproto/parseAtUri.ts
var parseAtUri = (atUri) => {
  let cleanedAtUri = atUri.replace("at://", "");
  const splitUri = cleanedAtUri.split("/");
  const did = splitUri.at(0) ?? "";
  const collection = splitUri.at(1) ?? "";
  const rkey = splitUri.at(2) ?? "self";
  return { did, collection, rkey };
};

// src/_internal/server/utils/claims.ts
var getEcocertsFromClaimActivities = (activitiesWithOrgInfo, pdsDomain) => {
  const ecocerts = [];
  for (const activityWithOrgInfo of activitiesWithOrgInfo) {
    const logo = activityWithOrgInfo.organizationInfo.logo;
    const logoUrl = logo ? getBlobUrl(activityWithOrgInfo.repo.did, logo.image, pdsDomain) : null;
    for (const activity of activityWithOrgInfo.activities) {
      ecocerts.push({
        repo: {
          did: activityWithOrgInfo.repo.did
        },
        organizationInfo: {
          name: activityWithOrgInfo.organizationInfo.displayName,
          logoUrl
        },
        claimActivity: activity
      });
    }
  }
  return ecocerts;
};
z.object({
  $type: z.literal("blob-ref-generator"),
  ref: z.object({
    $link: z.string()
  }),
  mimeType: z.string(),
  size: z.number()
});
var toBlobRef = (input) => {
  const validCID = CID.parse(
    input.ref.$link
  );
  return BlobRef.fromJsonRef({
    $type: "blob",
    ref: validCID,
    mimeType: input.mimeType,
    size: input.size
  });
};

// src/_internal/lib/isObject.ts
var isObject = (value) => {
  return typeof value === "object" && value !== null && !Array.isArray(value) && !(value instanceof RegExp) && !(value instanceof Date) && !(value instanceof Set) && !(value instanceof Map);
};

// src/_internal/utilities/transform/index.ts
var _serialize = (data) => {
  return JSON.parse(JSON.stringify(data));
};
var _deserialize = (data) => {
  const isObj = isObject(data);
  if (!isObj) {
    if (Array.isArray(data)) {
      return data.map(_deserialize);
    }
    return data;
  }
  if ("$type" in data && data.$type === "blob" && "ref" in data) {
    try {
      return toBlobRef(data);
    } catch {
      return data;
    }
  }
  const obj = data;
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, _deserialize(value)])
  );
};
var customTransformer = {
  serialize: (object) => {
    const atprotoSerialized = _serialize(object);
    const serializedObject = superjson.serialize(atprotoSerialized);
    return serializedObject;
  },
  deserialize: (object) => {
    const superjsonDeserialized = superjson.deserialize(object);
    const deserializedObject = _deserialize(superjsonDeserialized);
    return deserializedObject;
  }
};
var serialize = (data) => {
  const result = customTransformer.serialize(data);
  return result;
};
var deserialize = (object) => {
  return customTransformer.deserialize(object);
};
var HECTARES_PER_SQUARE_METER = 1e-4;
var isFeatureCollection = (value) => value.type === "FeatureCollection";
var isFeature = (value) => value.type === "Feature";
var isGeometryCollection = (value) => value.type === "GeometryCollection";
var isPolygon = (value) => value.type === "Polygon";
var isMultiPolygon = (value) => value.type === "MultiPolygon";
var isLineString = (value) => value.type === "LineString";
var isMultiLineString = (value) => value.type === "MultiLineString";
var isPoint = (value) => value.type === "Point";
var isMultiPoint = (value) => value.type === "MultiPoint";
var isLineStringClosed = (lineString) => {
  const coords = lineString.coordinates;
  if (coords.length < 4) return false;
  const first = coords[0];
  const last = coords[coords.length - 1];
  if (!first || !last || first.length < 2 || last.length < 2) return false;
  const firstLon = first[0];
  const firstLat = first[1];
  const lastLon = last[0];
  const lastLat = last[1];
  if (firstLon === void 0 || firstLat === void 0 || lastLon === void 0 || lastLat === void 0) {
    return false;
  }
  const tolerance = 1e-10;
  return Math.abs(firstLon - lastLon) < tolerance && Math.abs(firstLat - lastLat) < tolerance;
};
var lineStringToPolygon = (lineString) => {
  if (!isLineStringClosed(lineString)) return null;
  return {
    type: "Polygon",
    coordinates: [lineString.coordinates]
  };
};
var toFeature = (geometry) => ({
  type: "Feature",
  geometry,
  properties: {}
});
var extractPolygonFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPolygonFeatures(feature));
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractPolygonFeatures(toFeature(subGeometry))
      );
    }
    if (isPolygon(geometry2) || isMultiPolygon(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractPolygonFeatures(toFeature(subGeometry))
    );
  }
  if (isPolygon(geometry) || isMultiPolygon(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var extractLineStringFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap(
      (feature) => extractLineStringFeatures(feature)
    );
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractLineStringFeatures(toFeature(subGeometry))
      );
    }
    if (isLineString(geometry2) || isMultiLineString(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractLineStringFeatures(toFeature(subGeometry))
    );
  }
  if (isLineString(geometry) || isMultiLineString(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var extractPointFeatures = (input) => {
  if (isFeatureCollection(input)) {
    return input.features.flatMap((feature) => extractPointFeatures(feature));
  }
  if (isFeature(input)) {
    const geometry2 = input.geometry;
    if (!geometry2) return [];
    if (isGeometryCollection(geometry2)) {
      return geometry2.geometries.flatMap(
        (subGeometry) => extractPointFeatures(toFeature(subGeometry))
      );
    }
    if (isPoint(geometry2) || isMultiPoint(geometry2)) {
      return [input];
    }
    return [];
  }
  const geometry = input;
  if (isGeometryCollection(geometry)) {
    return geometry.geometries.flatMap(
      (subGeometry) => extractPointFeatures(toFeature(subGeometry))
    );
  }
  if (isPoint(geometry) || isMultiPoint(geometry)) {
    return [toFeature(geometry)];
  }
  return [];
};
var computeCentroid = (features) => {
  if (features.length === 0) return null;
  const collection = featureCollection(features);
  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForLineStrings = (features) => {
  if (features.length === 0) return null;
  const collection = featureCollection(features);
  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForPoints = (features) => {
  if (features.length === 0) return null;
  const collection = featureCollection(features);
  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computeCentroidForMixed = (features) => {
  if (features.length === 0) return null;
  const collection = featureCollection(features);
  try {
    const { geometry } = centerOfMass(collection);
    return geometry.coordinates;
  } catch {
    try {
      const { geometry } = centroid(collection);
      return geometry.coordinates;
    } catch {
      return null;
    }
  }
};
var computePolygonMetrics = (geoJson) => {
  const polygonFeatures = extractPolygonFeatures(geoJson);
  const lineStringFeatures = extractLineStringFeatures(geoJson);
  const pointFeatures = extractPointFeatures(geoJson);
  const convertedPolygons = [];
  for (const lineStringFeature of lineStringFeatures) {
    if (lineStringFeature.geometry.type === "LineString") {
      const polygon = lineStringToPolygon(lineStringFeature.geometry);
      if (polygon) {
        convertedPolygons.push({
          type: "Feature",
          geometry: polygon,
          properties: lineStringFeature.properties
        });
      }
    } else if (lineStringFeature.geometry.type === "MultiLineString") {
      for (const lineString of lineStringFeature.geometry.coordinates) {
        const ls = { coordinates: lineString };
        const polygon = lineStringToPolygon(ls);
        if (polygon) {
          convertedPolygons.push({
            type: "Feature",
            geometry: polygon,
            properties: lineStringFeature.properties
          });
        }
      }
    }
  }
  const allPolygonFeatures = [...polygonFeatures, ...convertedPolygons];
  if (pointFeatures.length > 0 && allPolygonFeatures.length === 0 && lineStringFeatures.length === 0) {
    const centroidPosition2 = computeCentroidForPoints(pointFeatures);
    const bbox2 = bbox(featureCollection(pointFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? "Success (Point)" : "Centroid calculation failed"
    };
  }
  if (lineStringFeatures.length > 0 && allPolygonFeatures.length === 0) {
    lineStringFeatures.reduce(
      (acc, feature) => acc + length(feature, { units: "meters" }),
      0
    );
    const centroidPosition2 = computeCentroidForLineStrings(lineStringFeatures);
    const bbox2 = bbox(featureCollection(lineStringFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? "Success (LineString)" : "Centroid calculation failed"
    };
  }
  const hasPolygons = allPolygonFeatures.length > 0;
  const hasLineStrings = lineStringFeatures.length > 0;
  const hasPoints = pointFeatures.length > 0;
  const geometryTypeCount = (hasPolygons ? 1 : 0) + (hasLineStrings ? 1 : 0) + (hasPoints ? 1 : 0);
  if (geometryTypeCount > 1) {
    const areaSqMeters2 = allPolygonFeatures.reduce(
      (acc, feature) => acc + area(feature),
      0
    );
    const allFeatures = [
      ...allPolygonFeatures,
      ...lineStringFeatures,
      ...pointFeatures
    ];
    const centroidPosition2 = computeCentroidForMixed(allFeatures);
    const bbox2 = bbox(featureCollection(allFeatures));
    let centroid2 = null;
    if (centroidPosition2 && centroidPosition2[0] !== void 0 && centroidPosition2[1] !== void 0) {
      const [lon, lat] = centroidPosition2;
      centroid2 = { lat, lon };
    }
    const typeLabels = [];
    if (hasPolygons) typeLabels.push("Polygon");
    if (hasLineStrings) typeLabels.push("LineString");
    if (hasPoints) typeLabels.push("Point");
    return {
      areaSqMeters: areaSqMeters2,
      areaHectares: areaSqMeters2 * HECTARES_PER_SQUARE_METER,
      centroid: centroid2,
      bbox: bbox2,
      message: centroid2 ? `Success (mixed: ${typeLabels.join(", ")})` : "Centroid calculation failed"
    };
  }
  if (allPolygonFeatures.length === 0 && lineStringFeatures.length === 0 && pointFeatures.length === 0) {
    return {
      areaSqMeters: null,
      areaHectares: null,
      centroid: null,
      bbox: null,
      message: "No polygons found"
    };
  }
  const areaSqMeters = allPolygonFeatures.reduce(
    (acc, feature) => acc + area(feature),
    0
  );
  const centroidPosition = computeCentroid(allPolygonFeatures);
  const bbox$1 = bbox(featureCollection(allPolygonFeatures));
  let centroid = null;
  if (centroidPosition && centroidPosition[0] !== void 0 && centroidPosition[1] !== void 0) {
    const [lon, lat] = centroidPosition;
    centroid = { lat, lon };
  }
  return {
    areaSqMeters,
    areaHectares: areaSqMeters * HECTARES_PER_SQUARE_METER,
    centroid,
    bbox: bbox$1,
    message: centroid ? "Success" : "Centroid calculation failed"
  };
};
var toFeatureCollection = (geoJson) => {
  if (isFeatureCollection(geoJson)) return geoJson;
  if (isFeature(geoJson)) {
    return featureCollection([geoJson]);
  }
  return featureCollection([toFeature(geoJson)]);
};

// src/_internal/lib/geojson/validate.ts
function validateGeojsonOrThrow(value) {
  if (value === null || typeof value !== "object") {
    throw new Error("GeoJSON must be an object");
  }
  const obj = value;
  if (!("type" in obj) || typeof obj.type !== "string") {
    throw new Error("GeoJSON must have a 'type' property of type string");
  }
  const type = obj.type;
  if (type === "FeatureCollection") {
    if (!("features" in obj) || !Array.isArray(obj.features)) {
      throw new Error(
        "FeatureCollection must have a 'features' property of type array"
      );
    }
    for (let i = 0; i < obj.features.length; i++) {
      try {
        validateGeojsonOrThrow(obj.features[i]);
      } catch (error) {
        throw new Error(
          `FeatureCollection.features[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    return obj;
  }
  if (type === "Feature") {
    if (!("geometry" in obj)) {
      throw new Error("Feature must have a 'geometry' property");
    }
    if (obj.geometry !== null) {
      try {
        validateGeometry(obj.geometry);
      } catch (error) {
        throw new Error(
          `Feature.geometry is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    if (!("properties" in obj)) {
      throw new Error("Feature must have a 'properties' property");
    }
    if (obj.properties !== null && typeof obj.properties !== "object") {
      throw new Error("Feature.properties must be an object or null");
    }
    return obj;
  }
  try {
    validateGeometry(obj);
    return obj;
  } catch (error) {
    throw new Error(
      `Invalid GeoJSON type '${type}': ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
function validateGeometry(value) {
  if (value === null || typeof value !== "object") {
    throw new Error("Geometry must be an object");
  }
  const geometry = value;
  if (!("type" in geometry) || typeof geometry.type !== "string") {
    throw new Error("Geometry must have a 'type' property of type string");
  }
  const type = geometry.type;
  if (type === "GeometryCollection") {
    if (!("geometries" in geometry) || !Array.isArray(geometry.geometries)) {
      throw new Error(
        "GeometryCollection must have a 'geometries' property of type array"
      );
    }
    for (let i = 0; i < geometry.geometries.length; i++) {
      try {
        validateGeometry(geometry.geometries[i]);
      } catch (error) {
        throw new Error(
          `GeometryCollection.geometries[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
    return;
  }
  const coordinateGeometries = [
    "Point",
    "LineString",
    "Polygon",
    "MultiPoint",
    "MultiLineString",
    "MultiPolygon"
  ];
  if (coordinateGeometries.includes(type)) {
    if (!("coordinates" in geometry)) {
      throw new Error(`${type} must have a 'coordinates' property`);
    }
    validateCoordinates(geometry.coordinates, type);
    return;
  }
  throw new Error(`Unknown geometry type: ${type}`);
}
function validateCoordinates(coordinates, type) {
  if (!Array.isArray(coordinates)) {
    throw new Error("Coordinates must be an array");
  }
  switch (type) {
    case "Point":
      validatePosition(coordinates);
      break;
    case "LineString":
      validateLineString(coordinates);
      break;
    case "Polygon":
      validatePolygon(coordinates);
      break;
    case "MultiPoint":
      validateMultiPoint(coordinates);
      break;
    case "MultiLineString":
      validateMultiLineString(coordinates);
      break;
    case "MultiPolygon":
      validateMultiPolygon(coordinates);
      break;
  }
}
function validatePosition(value) {
  if (!Array.isArray(value)) {
    throw new Error("Position must be an array");
  }
  if (value.length < 2) {
    throw new Error(
      "Position must have at least 2 elements (longitude, latitude)"
    );
  }
  if (typeof value[0] !== "number" || typeof value[1] !== "number") {
    throw new Error("Position must have numbers for longitude and latitude");
  }
  if (value.length > 2 && typeof value[2] !== "number") {
    throw new Error(
      "Position elevation (3rd element) must be a number if present"
    );
  }
  if (value[0] < -180 || value[0] > 180) {
    throw new Error("Longitude must be between -180 and 180");
  }
  if (value[1] < -90 || value[1] > 90) {
    throw new Error("Latitude must be between -90 and 90");
  }
}
function validateLineString(value) {
  if (!Array.isArray(value)) {
    throw new Error("LineString must be an array");
  }
  if (value.length < 2) {
    throw new Error("LineString must have at least 2 positions");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `LineString[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validatePolygon(value) {
  if (!Array.isArray(value)) {
    throw new Error("Polygon must be an array");
  }
  if (value.length === 0) {
    throw new Error("Polygon must have at least one LinearRing");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validateLinearRing(value[i]);
    } catch (error) {
      throw new Error(
        `Polygon[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateLinearRing(value) {
  if (!Array.isArray(value)) {
    throw new Error("LinearRing must be an array");
  }
  if (value.length < 4) {
    throw new Error("LinearRing must have at least 4 positions");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `LinearRing[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  const first = value[0];
  const last = value[value.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1] || first.length > 2 && first[2] !== last[2]) {
    throw new Error(
      "LinearRing must be closed (first and last positions must be equal)"
    );
  }
}
function validateMultiPoint(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiPoint must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePosition(value[i]);
    } catch (error) {
      throw new Error(
        `MultiPoint[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateMultiLineString(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiLineString must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validateLineString(value[i]);
    } catch (error) {
      throw new Error(
        `MultiLineString[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}
function validateMultiPolygon(value) {
  if (!Array.isArray(value)) {
    throw new Error("MultiPolygon must be an array");
  }
  for (let i = 0; i < value.length; i++) {
    try {
      validatePolygon(value[i]);
    } catch (error) {
      throw new Error(
        `MultiPolygon[${i}] is invalid: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

export { HECTARES_PER_SQUARE_METER, computePolygonMetrics, customTransformer, deserialize, extractLineStringFeatures, extractPointFeatures, extractPolygonFeatures, getBlobUrl, getEcocertsFromClaimActivities, parseAtUri, serialize, toFeatureCollection, validateGeojsonOrThrow };
//# sourceMappingURL=utilities.js.map
//# sourceMappingURL=utilities.js.map