import { GeoJsonObject, Feature, Polygon, MultiPolygon, LineString, MultiLineString, Point, MultiPoint, FeatureCollection } from 'geojson';

type Coordinates = {
    lat: number;
    lon: number;
};
type PolygonMetrics = {
    areaSqMeters: number | null;
    areaHectares: number | null;
    centroid: Coordinates | null;
    bbox: [number, number, number, number] | null;
    message: string;
};
declare const HECTARES_PER_SQUARE_METER = 0.0001;
declare const extractPolygonFeatures: (input: GeoJsonObject) => Feature<Polygon | MultiPolygon>[];
declare const extractLineStringFeatures: (input: GeoJsonObject) => Feature<LineString | MultiLineString>[];
declare const extractPointFeatures: (input: GeoJsonObject) => Feature<Point | MultiPoint>[];
declare const computePolygonMetrics: (geoJson: GeoJsonObject) => PolygonMetrics;
declare const toFeatureCollection: (geoJson: GeoJsonObject) => FeatureCollection;

/**
 * Validates if an unknown object is a valid GeoJSON object.
 * @param value - The value to validate
 * @returns The validated GeoJSON object
 * @throws Error if the value is not a valid GeoJSON object
 */
declare function validateGeojsonOrThrow(value: unknown): GeoJsonObject;

export { type Coordinates, HECTARES_PER_SQUARE_METER, type PolygonMetrics, computePolygonMetrics, extractLineStringFeatures, extractPointFeatures, extractPolygonFeatures, toFeatureCollection, validateGeojsonOrThrow };
