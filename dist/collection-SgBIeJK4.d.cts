import { $ as $TypedObject, V as ValidationResult, a as $Typed } from './utils-BtB-jULs.cjs';
import { B as BlobRef, U as Uri$1, S as SmallBlob, c as Main$m, d as Main$n, a as SmallImage, b as LargeImage } from './activity-CkQLvIqT.cjs';

/** Reference to external data via URI */
interface Uri {
    $type?: 'app.gainforest.common.defs#uri';
    /** URI to external resource */
    uri: string;
}
declare function isUri<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "uri">;
declare function validateUri<V>(v: V): ValidationResult<Uri & V>;
/** Image file for photos, camera traps, drone stills, scanned documents */
interface Image {
    $type?: 'app.gainforest.common.defs#image';
    /** Image up to 20MB. Supports JPEG, PNG, WebP, HEIC (phones), TIFF (scientific), GIF, BMP, SVG. */
    file: BlobRef;
}
declare function isImage<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "image">;
declare function validateImage<V>(v: V): ValidationResult<Image & V>;
/** Small image for thumbnails and previews */
interface ImageThumbnail {
    $type?: 'app.gainforest.common.defs#imageThumbnail';
    /** Thumbnail image up to 1MB */
    file: BlobRef;
}
declare function isImageThumbnail<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "imageThumbnail">;
declare function validateImageThumbnail<V>(v: V): ValidationResult<ImageThumbnail & V>;
/** Video file for camera traps, drone footage, underwater video, behavioral observations */
interface Video {
    $type?: 'app.gainforest.common.defs#video';
    /** Video up to 100MB. Supports MP4, MOV, AVI, WebM, MKV, MPEG, 3GP. */
    file: BlobRef;
}
declare function isVideo<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "video">;
declare function validateVideo<V>(v: V): ValidationResult<Video & V>;
/** Audio file for bioacoustics, soundscapes, field recordings, species calls */
interface Audio {
    $type?: 'app.gainforest.common.defs#audio';
    /** Audio up to 100MB. Supports WAV, MP3, M4A, AAC, FLAC, OGG, Opus, WebM, AIFF. */
    file: BlobRef;
}
declare function isAudio<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "audio">;
declare function validateAudio<V>(v: V): ValidationResult<Audio & V>;
/** Spectrogram image - visual representation of audio frequency content */
interface Spectrogram {
    $type?: 'app.gainforest.common.defs#spectrogram';
    /** Spectrogram image up to 5MB */
    file: BlobRef;
}
declare function isSpectrogram<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "spectrogram">;
declare function validateSpectrogram<V>(v: V): ValidationResult<Spectrogram & V>;
/** Document file for reports, field notes, permits, publications */
interface Document {
    $type?: 'app.gainforest.common.defs#document';
    /** Document up to 20MB. Supports PDF, TXT, Markdown, HTML, RTF, DOC, DOCX. */
    file: BlobRef;
}
declare function isDocument<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "document">;
declare function validateDocument<V>(v: V): ValidationResult<Document & V>;
/** Structured data file for observations, measurements, exports */
interface DataFile {
    $type?: 'app.gainforest.common.defs#dataFile';
    /** Data file up to 50MB. Supports CSV, TSV, JSON, JSON-LD, XML, XLS, XLSX, ODS. */
    file: BlobRef;
}
declare function isDataFile<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "dataFile">;
declare function validateDataFile<V>(v: V): ValidationResult<DataFile & V>;
/** GPS track file for transects, survey routes, patrol paths */
interface GpsTrack {
    $type?: 'app.gainforest.common.defs#gpsTrack';
    /** GPS track up to 10MB. Supports GPX, KML, KMZ, GeoJSON. */
    file: BlobRef;
}
declare function isGpsTrack<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "gpsTrack">;
declare function validateGpsTrack<V>(v: V): ValidationResult<GpsTrack & V>;
/** Geospatial data file for maps, boundaries, habitat layers */
interface Geospatial {
    $type?: 'app.gainforest.common.defs#geospatial';
    /** Geospatial data up to 100MB. Supports GeoJSON, KML, KMZ, GeoPackage, Shapefile (zipped), GeoTIFF. */
    file: BlobRef;
}
declare function isGeospatial<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "geospatial">;
declare function validateGeospatial<V>(v: V): ValidationResult<Geospatial & V>;
/** Sensor data file for environmental monitoring (temperature, humidity, light, etc.) */
interface SensorData {
    $type?: 'app.gainforest.common.defs#sensorData';
    /** Sensor data up to 50MB. Supports CSV, JSON, TXT, NetCDF, HDF5. */
    file: BlobRef;
}
declare function isSensorData<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "sensorData">;
declare function validateSensorData<V>(v: V): ValidationResult<SensorData & V>;
/** Genetic/genomic data file for eDNA, barcoding, sequencing results */
interface GeneticData {
    $type?: 'app.gainforest.common.defs#geneticData';
    /** Genetic data up to 100MB. Supports FASTA, FASTQ, CSV, JSON. */
    file: BlobRef;
}
declare function isGeneticData<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "geneticData">;
declare function validateGeneticData<V>(v: V): ValidationResult<GeneticData & V>;
/** Reference to an indexed organization */
interface IndexedOrganization {
    $type?: 'app.gainforest.common.defs#indexedOrganization';
    /** The URI of the organization */
    id: string;
    /** The name of the organization */
    name: string;
}
declare function isIndexedOrganization<V>(v: V): v is $TypedObject<V, "app.gainforest.common.defs", "indexedOrganization">;
declare function validateIndexedOrganization<V>(v: V): ValidationResult<IndexedOrganization & V>;

type defs_Audio = Audio;
type defs_DataFile = DataFile;
type defs_Document = Document;
type defs_GeneticData = GeneticData;
type defs_Geospatial = Geospatial;
type defs_GpsTrack = GpsTrack;
type defs_Image = Image;
type defs_ImageThumbnail = ImageThumbnail;
type defs_IndexedOrganization = IndexedOrganization;
type defs_SensorData = SensorData;
type defs_Spectrogram = Spectrogram;
type defs_Uri = Uri;
type defs_Video = Video;
declare const defs_isAudio: typeof isAudio;
declare const defs_isDataFile: typeof isDataFile;
declare const defs_isDocument: typeof isDocument;
declare const defs_isGeneticData: typeof isGeneticData;
declare const defs_isGeospatial: typeof isGeospatial;
declare const defs_isGpsTrack: typeof isGpsTrack;
declare const defs_isImage: typeof isImage;
declare const defs_isImageThumbnail: typeof isImageThumbnail;
declare const defs_isIndexedOrganization: typeof isIndexedOrganization;
declare const defs_isSensorData: typeof isSensorData;
declare const defs_isSpectrogram: typeof isSpectrogram;
declare const defs_isUri: typeof isUri;
declare const defs_isVideo: typeof isVideo;
declare const defs_validateAudio: typeof validateAudio;
declare const defs_validateDataFile: typeof validateDataFile;
declare const defs_validateDocument: typeof validateDocument;
declare const defs_validateGeneticData: typeof validateGeneticData;
declare const defs_validateGeospatial: typeof validateGeospatial;
declare const defs_validateGpsTrack: typeof validateGpsTrack;
declare const defs_validateImage: typeof validateImage;
declare const defs_validateImageThumbnail: typeof validateImageThumbnail;
declare const defs_validateIndexedOrganization: typeof validateIndexedOrganization;
declare const defs_validateSensorData: typeof validateSensorData;
declare const defs_validateSpectrogram: typeof validateSpectrogram;
declare const defs_validateUri: typeof validateUri;
declare const defs_validateVideo: typeof validateVideo;
declare namespace defs {
  export { type defs_Audio as Audio, type defs_DataFile as DataFile, type defs_Document as Document, type defs_GeneticData as GeneticData, type defs_Geospatial as Geospatial, type defs_GpsTrack as GpsTrack, type defs_Image as Image, type defs_ImageThumbnail as ImageThumbnail, type defs_IndexedOrganization as IndexedOrganization, type defs_SensorData as SensorData, type defs_Spectrogram as Spectrogram, type defs_Uri as Uri, type defs_Video as Video, defs_isAudio as isAudio, defs_isDataFile as isDataFile, defs_isDocument as isDocument, defs_isGeneticData as isGeneticData, defs_isGeospatial as isGeospatial, defs_isGpsTrack as isGpsTrack, defs_isImage as isImage, defs_isImageThumbnail as isImageThumbnail, defs_isIndexedOrganization as isIndexedOrganization, defs_isSensorData as isSensorData, defs_isSpectrogram as isSpectrogram, defs_isUri as isUri, defs_isVideo as isVideo, defs_validateAudio as validateAudio, defs_validateDataFile as validateDataFile, defs_validateDocument as validateDocument, defs_validateGeneticData as validateGeneticData, defs_validateGeospatial as validateGeospatial, defs_validateGpsTrack as validateGpsTrack, defs_validateImage as validateImage, defs_validateImageThumbnail as validateImageThumbnail, defs_validateIndexedOrganization as validateIndexedOrganization, defs_validateSensorData as validateSensorData, defs_validateSpectrogram as validateSpectrogram, defs_validateUri as validateUri, defs_validateVideo as validateVideo };
}

interface Main$l {
    $type: 'app.gainforest.organization.defaultSite';
    /** The reference to the default site record in the PDS */
    site: string;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$l<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.defaultSite", "main">;
declare function validateMain$l<V>(v: V): ValidationResult<Main$l & V>;

declare namespace AppGainforestOrganizationDefaultSite {
  export { type Main$l as Main, type Main$l as Record, isMain$l as isMain, isMain$l as isRecord, validateMain$l as validateMain, validateMain$l as validateRecord };
}

interface Main$k {
    $type: 'app.certified.location';
    /** The version of the Location Protocol */
    lpVersion: string;
    /** The Spatial Reference System URI (e.g., http://www.opengis.net/def/crs/OGC/1.3/CRS84) that defines the coordinate system. */
    srs: string;
    /** An identifier for the format of the location data (e.g., coordinate-decimal, geojson-point) */
    locationType: 'coordinate-decimal' | 'geojson-point' | (string & {});
    location: $Typed<Uri$1> | $Typed<SmallBlob> | $Typed<String> | {
        $type: string;
    };
    /** Optional name for this location */
    name?: string;
    /** Optional description for this location */
    description?: string;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$k<V>(v: V): v is $TypedObject<V, "app.certified.location", "main">;
declare function validateMain$k<V>(v: V): ValidationResult<Main$k & V>;

/** A location represented as a string, e.g. coordinates or a small GeoJSON string. */
interface String {
    $type?: 'app.certified.location#string';
    /** The location string value */
    string: string;
}
declare function isString<V>(v: V): v is $TypedObject<V, "app.certified.location", "string">;
declare function validateString<V>(v: V): ValidationResult<String & V>;

type AppCertifiedLocation_String = String;
declare const AppCertifiedLocation_isString: typeof isString;
declare const AppCertifiedLocation_validateString: typeof validateString;
declare namespace AppCertifiedLocation {
  export { type Main$k as Main, type Main$k as Record, type AppCertifiedLocation_String as String, isMain$k as isMain, isMain$k as isRecord, AppCertifiedLocation_isString as isString, validateMain$k as validateMain, validateMain$k as validateRecord, AppCertifiedLocation_validateString as validateString };
}

interface Main$j {
    $type?: 'pub.leaflet.blocks.iframe';
    url: string;
    height?: number;
}
declare function isMain$j<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.iframe", "main">;
declare function validateMain$j<V>(v: V): ValidationResult<Main$j & V>;

declare namespace iframe {
  export { type Main$j as Main, isMain$j as isMain, validateMain$j as validateMain };
}

/** Annotation of a sub-string within rich text. */
interface Main$i {
    $type?: 'pub.leaflet.richtext.facet';
    index: ByteSlice;
    features: ($Typed<Link> | $Typed<DidMention> | $Typed<AtMention> | $Typed<Code> | $Typed<Highlight> | $Typed<Underline> | $Typed<Strikethrough> | $Typed<Id> | $Typed<Bold> | $Typed<Italic> | {
        $type: string;
    })[];
}
declare function isMain$i<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "main">;
declare function validateMain$i<V>(v: V): ValidationResult<Main$i & V>;
/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
interface ByteSlice {
    $type?: 'pub.leaflet.richtext.facet#byteSlice';
    byteStart: number;
    byteEnd: number;
}
declare function isByteSlice<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "byteSlice">;
declare function validateByteSlice<V>(v: V): ValidationResult<ByteSlice & V>;
/** Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL. */
interface Link {
    $type?: 'pub.leaflet.richtext.facet#link';
    uri: string;
}
declare function isLink<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "link">;
declare function validateLink<V>(v: V): ValidationResult<Link & V>;
/** Facet feature for mentioning a did. */
interface DidMention {
    $type?: 'pub.leaflet.richtext.facet#didMention';
    did: string;
}
declare function isDidMention<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "didMention">;
declare function validateDidMention<V>(v: V): ValidationResult<DidMention & V>;
/** Facet feature for mentioning an AT URI. */
interface AtMention {
    $type?: 'pub.leaflet.richtext.facet#atMention';
    atURI: string;
}
declare function isAtMention<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "atMention">;
declare function validateAtMention<V>(v: V): ValidationResult<AtMention & V>;
/** Facet feature for inline code. */
interface Code {
    $type?: 'pub.leaflet.richtext.facet#code';
}
declare function isCode<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "code">;
declare function validateCode<V>(v: V): ValidationResult<Code & V>;
/** Facet feature for highlighted text. */
interface Highlight {
    $type?: 'pub.leaflet.richtext.facet#highlight';
}
declare function isHighlight<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "highlight">;
declare function validateHighlight<V>(v: V): ValidationResult<Highlight & V>;
/** Facet feature for underline markup */
interface Underline {
    $type?: 'pub.leaflet.richtext.facet#underline';
}
declare function isUnderline<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "underline">;
declare function validateUnderline<V>(v: V): ValidationResult<Underline & V>;
/** Facet feature for strikethrough markup */
interface Strikethrough {
    $type?: 'pub.leaflet.richtext.facet#strikethrough';
}
declare function isStrikethrough<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "strikethrough">;
declare function validateStrikethrough<V>(v: V): ValidationResult<Strikethrough & V>;
/** Facet feature for an identifier. Used for linking to a segment */
interface Id {
    $type?: 'pub.leaflet.richtext.facet#id';
    id?: string;
}
declare function isId<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "id">;
declare function validateId<V>(v: V): ValidationResult<Id & V>;
/** Facet feature for bold text */
interface Bold {
    $type?: 'pub.leaflet.richtext.facet#bold';
}
declare function isBold<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "bold">;
declare function validateBold<V>(v: V): ValidationResult<Bold & V>;
/** Facet feature for italic text */
interface Italic {
    $type?: 'pub.leaflet.richtext.facet#italic';
}
declare function isItalic<V>(v: V): v is $TypedObject<V, "pub.leaflet.richtext.facet", "italic">;
declare function validateItalic<V>(v: V): ValidationResult<Italic & V>;

type facet_AtMention = AtMention;
type facet_Bold = Bold;
type facet_ByteSlice = ByteSlice;
type facet_Code = Code;
type facet_DidMention = DidMention;
type facet_Highlight = Highlight;
type facet_Id = Id;
type facet_Italic = Italic;
type facet_Link = Link;
type facet_Strikethrough = Strikethrough;
type facet_Underline = Underline;
declare const facet_isAtMention: typeof isAtMention;
declare const facet_isBold: typeof isBold;
declare const facet_isByteSlice: typeof isByteSlice;
declare const facet_isCode: typeof isCode;
declare const facet_isDidMention: typeof isDidMention;
declare const facet_isHighlight: typeof isHighlight;
declare const facet_isId: typeof isId;
declare const facet_isItalic: typeof isItalic;
declare const facet_isLink: typeof isLink;
declare const facet_isStrikethrough: typeof isStrikethrough;
declare const facet_isUnderline: typeof isUnderline;
declare const facet_validateAtMention: typeof validateAtMention;
declare const facet_validateBold: typeof validateBold;
declare const facet_validateByteSlice: typeof validateByteSlice;
declare const facet_validateCode: typeof validateCode;
declare const facet_validateDidMention: typeof validateDidMention;
declare const facet_validateHighlight: typeof validateHighlight;
declare const facet_validateId: typeof validateId;
declare const facet_validateItalic: typeof validateItalic;
declare const facet_validateLink: typeof validateLink;
declare const facet_validateStrikethrough: typeof validateStrikethrough;
declare const facet_validateUnderline: typeof validateUnderline;
declare namespace facet {
  export { type facet_AtMention as AtMention, type facet_Bold as Bold, type facet_ByteSlice as ByteSlice, type facet_Code as Code, type facet_DidMention as DidMention, type facet_Highlight as Highlight, type facet_Id as Id, type facet_Italic as Italic, type facet_Link as Link, type Main$i as Main, type facet_Strikethrough as Strikethrough, type facet_Underline as Underline, facet_isAtMention as isAtMention, facet_isBold as isBold, facet_isByteSlice as isByteSlice, facet_isCode as isCode, facet_isDidMention as isDidMention, facet_isHighlight as isHighlight, facet_isId as isId, facet_isItalic as isItalic, facet_isLink as isLink, isMain$i as isMain, facet_isStrikethrough as isStrikethrough, facet_isUnderline as isUnderline, facet_validateAtMention as validateAtMention, facet_validateBold as validateBold, facet_validateByteSlice as validateByteSlice, facet_validateCode as validateCode, facet_validateDidMention as validateDidMention, facet_validateHighlight as validateHighlight, facet_validateId as validateId, facet_validateItalic as validateItalic, facet_validateLink as validateLink, validateMain$i as validateMain, facet_validateStrikethrough as validateStrikethrough, facet_validateUnderline as validateUnderline };
}

interface Main$h {
    $type?: 'pub.leaflet.blocks.text';
    plaintext: string;
    textSize?: 'default' | 'small' | 'large';
    facets?: Main$i[];
}
declare function isMain$h<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.text", "main">;
declare function validateMain$h<V>(v: V): ValidationResult<Main$h & V>;

declare namespace text {
  export { type Main$h as Main, isMain$h as isMain, validateMain$h as validateMain };
}

interface Main$g {
    $type?: 'pub.leaflet.blocks.blockquote';
    plaintext: string;
    facets?: Main$i[];
}
declare function isMain$g<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.blockquote", "main">;
declare function validateMain$g<V>(v: V): ValidationResult<Main$g & V>;

declare namespace blockquote {
  export { type Main$g as Main, isMain$g as isMain, validateMain$g as validateMain };
}

interface Main$f {
    $type?: 'pub.leaflet.blocks.header';
    level?: number;
    plaintext: string;
    facets?: Main$i[];
}
declare function isMain$f<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.header", "main">;
declare function validateMain$f<V>(v: V): ValidationResult<Main$f & V>;

declare namespace header {
  export { type Main$f as Main, isMain$f as isMain, validateMain$f as validateMain };
}

interface Main$e {
    $type?: 'pub.leaflet.blocks.image';
    image: BlobRef;
    /** Alt text description of the image, for accessibility. */
    alt?: string;
    aspectRatio: AspectRatio;
}
declare function isMain$e<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.image", "main">;
declare function validateMain$e<V>(v: V): ValidationResult<Main$e & V>;
interface AspectRatio {
    $type?: 'pub.leaflet.blocks.image#aspectRatio';
    width: number;
    height: number;
}
declare function isAspectRatio<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.image", "aspectRatio">;
declare function validateAspectRatio<V>(v: V): ValidationResult<AspectRatio & V>;

type image_AspectRatio = AspectRatio;
declare const image_isAspectRatio: typeof isAspectRatio;
declare const image_validateAspectRatio: typeof validateAspectRatio;
declare namespace image {
  export { type image_AspectRatio as AspectRatio, type Main$e as Main, image_isAspectRatio as isAspectRatio, isMain$e as isMain, image_validateAspectRatio as validateAspectRatio, validateMain$e as validateMain };
}

interface Main$d {
    $type?: 'pub.leaflet.blocks.unorderedList';
    children: ListItem[];
}
declare function isMain$d<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.unorderedList", "main">;
declare function validateMain$d<V>(v: V): ValidationResult<Main$d & V>;
interface ListItem {
    $type?: 'pub.leaflet.blocks.unorderedList#listItem';
    content: $Typed<Main$h> | $Typed<Main$f> | $Typed<Main$e> | {
        $type: string;
    };
    children?: ListItem[];
}
declare function isListItem<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.unorderedList", "listItem">;
declare function validateListItem<V>(v: V): ValidationResult<ListItem & V>;

type unorderedList_ListItem = ListItem;
declare const unorderedList_isListItem: typeof isListItem;
declare const unorderedList_validateListItem: typeof validateListItem;
declare namespace unorderedList {
  export { type unorderedList_ListItem as ListItem, type Main$d as Main, unorderedList_isListItem as isListItem, isMain$d as isMain, unorderedList_validateListItem as validateListItem, validateMain$d as validateMain };
}

interface Main$c {
    $type?: 'pub.leaflet.blocks.website';
    previewImage?: BlobRef;
    title?: string;
    description?: string;
    src: string;
}
declare function isMain$c<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.website", "main">;
declare function validateMain$c<V>(v: V): ValidationResult<Main$c & V>;

declare namespace website {
  export { type Main$c as Main, isMain$c as isMain, validateMain$c as validateMain };
}

interface Main$b {
    $type?: 'pub.leaflet.blocks.math';
    tex: string;
}
declare function isMain$b<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.math", "main">;
declare function validateMain$b<V>(v: V): ValidationResult<Main$b & V>;

declare namespace math {
  export { type Main$b as Main, isMain$b as isMain, validateMain$b as validateMain };
}

interface Main$a {
    $type?: 'pub.leaflet.blocks.code';
    plaintext: string;
    language?: string;
    syntaxHighlightingTheme?: string;
}
declare function isMain$a<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.code", "main">;
declare function validateMain$a<V>(v: V): ValidationResult<Main$a & V>;

declare namespace code {
  export { type Main$a as Main, isMain$a as isMain, validateMain$a as validateMain };
}

interface Main$9 {
    $type?: 'pub.leaflet.blocks.horizontalRule';
}
declare function isMain$9<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.horizontalRule", "main">;
declare function validateMain$9<V>(v: V): ValidationResult<Main$9 & V>;

declare namespace horizontalRule {
  export { type Main$9 as Main, isMain$9 as isMain, validateMain$9 as validateMain };
}

interface Main$8 {
    $type?: 'pub.leaflet.blocks.bskyPost';
    postRef: Main$m;
}
declare function isMain$8<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.bskyPost", "main">;
declare function validateMain$8<V>(v: V): ValidationResult<Main$8 & V>;

declare namespace bskyPost {
  export { type Main$8 as Main, isMain$8 as isMain, validateMain$8 as validateMain };
}

interface Main$7 {
    $type?: 'pub.leaflet.blocks.page';
    id: string;
}
declare function isMain$7<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.page", "main">;
declare function validateMain$7<V>(v: V): ValidationResult<Main$7 & V>;

declare namespace page {
  export { type Main$7 as Main, isMain$7 as isMain, validateMain$7 as validateMain };
}

interface Main$6 {
    $type?: 'pub.leaflet.blocks.poll';
    pollRef: Main$m;
}
declare function isMain$6<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.poll", "main">;
declare function validateMain$6<V>(v: V): ValidationResult<Main$6 & V>;

declare namespace poll {
  export { type Main$6 as Main, isMain$6 as isMain, validateMain$6 as validateMain };
}

interface Main$5 {
    $type?: 'pub.leaflet.blocks.button';
    text: string;
    url: string;
}
declare function isMain$5<V>(v: V): v is $TypedObject<V, "pub.leaflet.blocks.button", "main">;
declare function validateMain$5<V>(v: V): ValidationResult<Main$5 & V>;

declare namespace button {
  export { type Main$5 as Main, isMain$5 as isMain, validateMain$5 as validateMain };
}

interface Main$4 {
    $type?: 'pub.leaflet.pages.linearDocument';
    id?: string;
    blocks: Block[];
}
declare function isMain$4<V>(v: V): v is $TypedObject<V, "pub.leaflet.pages.linearDocument", "main">;
declare function validateMain$4<V>(v: V): ValidationResult<Main$4 & V>;
interface Block {
    $type?: 'pub.leaflet.pages.linearDocument#block';
    block: $Typed<Main$j> | $Typed<Main$h> | $Typed<Main$g> | $Typed<Main$f> | $Typed<Main$e> | $Typed<Main$d> | $Typed<Main$c> | $Typed<Main$b> | $Typed<Main$a> | $Typed<Main$9> | $Typed<Main$8> | $Typed<Main$7> | $Typed<Main$6> | $Typed<Main$5> | {
        $type: string;
    };
    alignment?: 'lex:pub.leaflet.pages.linearDocument#textAlignLeft' | 'lex:pub.leaflet.pages.linearDocument#textAlignCenter' | 'lex:pub.leaflet.pages.linearDocument#textAlignRight' | 'lex:pub.leaflet.pages.linearDocument#textAlignJustify' | (string & {});
}
declare function isBlock<V>(v: V): v is $TypedObject<V, "pub.leaflet.pages.linearDocument", "block">;
declare function validateBlock<V>(v: V): ValidationResult<Block & V>;
declare const TEXTALIGNLEFT = "pub.leaflet.pages.linearDocument#textAlignLeft";
declare const TEXTALIGNCENTER = "pub.leaflet.pages.linearDocument#textAlignCenter";
declare const TEXTALIGNRIGHT = "pub.leaflet.pages.linearDocument#textAlignRight";
declare const TEXTALIGNJUSTIFY = "pub.leaflet.pages.linearDocument#textAlignJustify";
interface Quote {
    $type?: 'pub.leaflet.pages.linearDocument#quote';
    start: Position;
    end: Position;
}
declare function isQuote<V>(v: V): v is $TypedObject<V, "pub.leaflet.pages.linearDocument", "quote">;
declare function validateQuote<V>(v: V): ValidationResult<Quote & V>;
interface Position {
    $type?: 'pub.leaflet.pages.linearDocument#position';
    block: number[];
    offset: number;
}
declare function isPosition<V>(v: V): v is $TypedObject<V, "pub.leaflet.pages.linearDocument", "position">;
declare function validatePosition<V>(v: V): ValidationResult<Position & V>;

type linearDocument_Block = Block;
type linearDocument_Position = Position;
type linearDocument_Quote = Quote;
declare const linearDocument_TEXTALIGNCENTER: typeof TEXTALIGNCENTER;
declare const linearDocument_TEXTALIGNJUSTIFY: typeof TEXTALIGNJUSTIFY;
declare const linearDocument_TEXTALIGNLEFT: typeof TEXTALIGNLEFT;
declare const linearDocument_TEXTALIGNRIGHT: typeof TEXTALIGNRIGHT;
declare const linearDocument_isBlock: typeof isBlock;
declare const linearDocument_isPosition: typeof isPosition;
declare const linearDocument_isQuote: typeof isQuote;
declare const linearDocument_validateBlock: typeof validateBlock;
declare const linearDocument_validatePosition: typeof validatePosition;
declare const linearDocument_validateQuote: typeof validateQuote;
declare namespace linearDocument {
  export { type linearDocument_Block as Block, type Main$4 as Main, type linearDocument_Position as Position, type linearDocument_Quote as Quote, linearDocument_TEXTALIGNCENTER as TEXTALIGNCENTER, linearDocument_TEXTALIGNJUSTIFY as TEXTALIGNJUSTIFY, linearDocument_TEXTALIGNLEFT as TEXTALIGNLEFT, linearDocument_TEXTALIGNRIGHT as TEXTALIGNRIGHT, linearDocument_isBlock as isBlock, isMain$4 as isMain, linearDocument_isPosition as isPosition, linearDocument_isQuote as isQuote, linearDocument_validateBlock as validateBlock, validateMain$4 as validateMain, linearDocument_validatePosition as validatePosition, linearDocument_validateQuote as validateQuote };
}

interface Main$3 {
    $type: 'app.gainforest.organization.info';
    /** The name of the organization or project */
    displayName: string;
    shortDescription: Main$n;
    longDescription: Main$4;
    coverImage?: SmallImage;
    logo?: SmallImage;
    /** The objectives of the organization or project */
    objectives: ('Conservation' | 'Research' | 'Education' | 'Community' | 'Other')[];
    /** The start date of the organization or project */
    startDate?: string;
    /** The website of the organization or project */
    website?: string;
    /** The country of the organization or project in two letter code (ISO 3166-1 alpha-2) */
    country: string;
    /** The visibility of the organization or project in the Green Globe */
    visibility: 'Public' | 'Unlisted';
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$3<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.info", "main">;
declare function validateMain$3<V>(v: V): ValidationResult<Main$3 & V>;

declare namespace AppGainforestOrganizationInfo {
  export { type Main$3 as Main, type Main$3 as Record, isMain$3 as isMain, isMain$3 as isRecord, validateMain$3 as validateMain, validateMain$3 as validateRecord };
}

interface Main$2 {
    $type: 'app.gainforest.organization.layer';
    /** The name of the site */
    name: string;
    /** The type of the layer */
    type: 'geojson_points' | 'geojson_points_trees' | 'geojson_line' | 'choropleth' | 'choropleth_shannon' | 'raster_tif' | 'tms_tile';
    /** The URI of the layer */
    uri: string;
    /** The description of the layer */
    description?: string;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$2<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.layer", "main">;
declare function validateMain$2<V>(v: V): ValidationResult<Main$2 & V>;

declare namespace AppGainforestOrganizationLayer {
  export { type Main$2 as Main, type Main$2 as Record, isMain$2 as isMain, isMain$2 as isRecord, validateMain$2 as validateMain, validateMain$2 as validateRecord };
}

interface Main$1 {
    $type: 'app.gainforest.organization.observations.measuredTreesCluster';
    shapefile: SmallBlob;
    /** The date and time of the creation of the record */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain$1<V>(v: V): v is $TypedObject<V, "app.gainforest.organization.observations.measuredTreesCluster", "main">;
declare function validateMain$1<V>(v: V): ValidationResult<Main$1 & V>;

declare namespace AppGainforestOrganizationObservationsMeasuredTreesCluster {
  export { type Main$1 as Main, type Main$1 as Record, isMain$1 as isMain, isMain$1 as isRecord, validateMain$1 as validateMain, validateMain$1 as validateRecord };
}

interface Main {
    $type: 'org.hypercerts.claim.collection';
    /** The type of this collection. Possible fields can be 'favorites', 'project', or any other type of collection. */
    type?: string;
    /** The title of this collection */
    title: string;
    /** Short summary of this collection, suitable for previews and list views */
    shortDescription?: string;
    description?: Main$4;
    avatar?: $Typed<Uri$1> | $Typed<SmallImage> | {
        $type: string;
    };
    banner?: $Typed<Uri$1> | $Typed<LargeImage> | {
        $type: string;
    };
    /** Array of items in this collection with optional weights. */
    items: Item[];
    location?: Main$m;
    /** Client-declared timestamp when this record was originally created */
    createdAt: string;
    [k: string]: unknown;
}
declare function isMain<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.collection", "main">;
declare function validateMain<V>(v: V): ValidationResult<Main & V>;

interface Item {
    $type?: 'org.hypercerts.claim.collection#item';
    itemIdentifier: Main$m;
    /** Optional weight for this item (positive numeric value stored as string). Weights do not need to sum to a specific total; normalization can be performed by the consuming application as needed. */
    itemWeight?: string;
}
declare function isItem<V>(v: V): v is $TypedObject<V, "org.hypercerts.claim.collection", "item">;
declare function validateItem<V>(v: V): ValidationResult<Item & V>;

type OrgHypercertsClaimCollection_Item = Item;
type OrgHypercertsClaimCollection_Main = Main;
declare const OrgHypercertsClaimCollection_isItem: typeof isItem;
declare const OrgHypercertsClaimCollection_isMain: typeof isMain;
declare const OrgHypercertsClaimCollection_validateItem: typeof validateItem;
declare const OrgHypercertsClaimCollection_validateMain: typeof validateMain;
declare namespace OrgHypercertsClaimCollection {
  export { type OrgHypercertsClaimCollection_Item as Item, type OrgHypercertsClaimCollection_Main as Main, type Main as Record, OrgHypercertsClaimCollection_isItem as isItem, OrgHypercertsClaimCollection_isMain as isMain, isMain as isRecord, OrgHypercertsClaimCollection_validateItem as validateItem, OrgHypercertsClaimCollection_validateMain as validateMain, validateMain as validateRecord };
}

export { type Audio as A, website as B, linearDocument as C, facet as D, type Image as I, type Main$k as M, OrgHypercertsClaimCollection as O, type Spectrogram as S, type Uri as U, type Video as V, type Main$l as a, type Main$3 as b, type Main$2 as c, type Main$1 as d, type Main as e, type ImageThumbnail as f, type IndexedOrganization as g, AppCertifiedLocation as h, defs as i, AppGainforestOrganizationDefaultSite as j, AppGainforestOrganizationInfo as k, AppGainforestOrganizationLayer as l, AppGainforestOrganizationObservationsMeasuredTreesCluster as m, blockquote as n, bskyPost as o, button as p, code as q, header as r, horizontalRule as s, iframe as t, image as u, math as v, page as w, poll as x, text as y, unorderedList as z };
