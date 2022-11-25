type Maybe<T> = T | null;
type InputMaybe<T> = Maybe<T>;
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BooleanType: any;
  CustomData: any;
  DateTime: any;
  FloatType: any;
  IntType: any;
  ItemId: any;
  JsonField: any;
  MetaTagAttributes: any;
  UploadId: any;
};

type AboutModelContentBlocksField = ButtonRecord | ImageRecord | VideoRecord;

type AboutModelContentField = {
  __typename?: 'AboutModelContentField';
  blocks: Array<AboutModelContentBlocksField>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

type AboutModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<AboutModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  intro?: InputMaybe<TextFilter>;
  position?: InputMaybe<PositionFilter>;
  showImage?: InputMaybe<BooleanFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum AboutModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  position_ASC = 'position_ASC',
  position_DESC = 'position_DESC',
  showImage_ASC = 'showImage_ASC',
  showImage_DESC = 'showImage_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Om (about) */
type AboutRecord = RecordInterface & {
  __typename?: 'AboutRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<AboutModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  intro?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['IntType']>;
  showImage?: Maybe<Scalars['BooleanType']>;
  slug: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Om (about) */
type AboutRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Om (about) */
type AboutRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

type ApplicationModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ApplicationModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  approvalToken?: InputMaybe<StringFilter>;
  approved?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  lastName?: InputMaybe<StringFilter>;
  media?: InputMaybe<JsonFilter>;
  message?: InputMaybe<TextFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum ApplicationModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  approvalToken_ASC = 'approvalToken_ASC',
  approvalToken_DESC = 'approvalToken_DESC',
  approved_ASC = 'approved_ASC',
  approved_DESC = 'approved_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  firstName_ASC = 'firstName_ASC',
  firstName_DESC = 'firstName_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  lastName_ASC = 'lastName_ASC',
  lastName_DESC = 'lastName_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Ansökning (application) */
type ApplicationRecord = RecordInterface & {
  __typename?: 'ApplicationRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  approvalToken?: Maybe<Scalars['String']>;
  approved?: Maybe<Scalars['BooleanType']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ItemId'];
  lastName: Scalars['String'];
  media?: Maybe<Scalars['JsonField']>;
  message: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Ansökning (application) */
type ApplicationRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Ansökning (application) */
type ApplicationRecordmessageArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Record of type Bli medlem (apply) */
type ApplyRecord = RecordInterface & {
  __typename?: 'ApplyRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Bli medlem (apply) */
type ApplyRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter Boolean fields */
type BooleanFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['BooleanType']>;
};

/** Block of type Knapp (button) */
type ButtonRecord = RecordInterface & {
  __typename?: 'ButtonRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};


/** Block of type Knapp (button) */
type ButtonRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type CollectionMetadata = {
  __typename?: 'CollectionMetadata';
  count: Scalars['IntType'];
};

enum ColorBucketType {
  black = 'black',
  blue = 'blue',
  brown = 'brown',
  cyan = 'cyan',
  green = 'green',
  grey = 'grey',
  orange = 'orange',
  pink = 'pink',
  purple = 'purple',
  red = 'red',
  white = 'white',
  yellow = 'yellow'
}

type ColorField = {
  __typename?: 'ColorField';
  alpha: Scalars['IntType'];
  blue: Scalars['IntType'];
  green: Scalars['IntType'];
  hex: Scalars['String'];
  red: Scalars['IntType'];
};

type CommissionCategoryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<CommissionCategoryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum CommissionCategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Uppdragskategori (commission_category) */
type CommissionCategoryRecord = RecordInterface & {
  __typename?: 'CommissionCategoryRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Uppdragskategori (commission_category) */
type CommissionCategoryRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type CommissionModelContentField = ImageRecord | VideoRecord;

type CommissionModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<CommissionModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  artist?: InputMaybe<StringFilter>;
  category?: InputMaybe<LinkFilter>;
  city?: InputMaybe<StringFilter>;
  consultant?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  intro?: InputMaybe<TextFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  year?: InputMaybe<StringFilter>;
};

enum CommissionModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  artist_ASC = 'artist_ASC',
  artist_DESC = 'artist_DESC',
  city_ASC = 'city_ASC',
  city_DESC = 'city_DESC',
  consultant_ASC = 'consultant_ASC',
  consultant_DESC = 'consultant_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  year_ASC = 'year_ASC',
  year_DESC = 'year_DESC'
}

/** Record of type Uppdrag (commission) */
type CommissionRecord = RecordInterface & {
  __typename?: 'CommissionRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  artist?: Maybe<Scalars['String']>;
  category: CommissionCategoryRecord;
  city?: Maybe<Scalars['String']>;
  consultant?: Maybe<Scalars['String']>;
  content: Array<CommissionModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  intro?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  year?: Maybe<Scalars['String']>;
};


/** Record of type Uppdrag (commission) */
type CommissionRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Uppdrag (commission) */
type CommissionRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

type ConsultModelContentBlocksField = ButtonRecord | GalleryRecord | ImageRecord | VideoRecord;

type ConsultModelContentField = {
  __typename?: 'ConsultModelContentField';
  blocks: Array<ConsultModelContentBlocksField>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

type ConsultModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ConsultModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<StructuredTextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  intro?: InputMaybe<TextFilter>;
  showImage?: InputMaybe<BooleanFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum ConsultModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  showImage_ASC = 'showImage_ASC',
  showImage_DESC = 'showImage_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Anlita oss (consult) */
type ConsultRecord = RecordInterface & {
  __typename?: 'ConsultRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<ConsultModelContentField>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  intro?: Maybe<Scalars['String']>;
  showImage?: Maybe<Scalars['BooleanType']>;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Anlita oss (consult) */
type ConsultRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Anlita oss (consult) */
type ConsultRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Block of type Kontakt (contact) */
type ContactRecord = RecordInterface & {
  __typename?: 'ContactRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  address?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  phone?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Kontakt (contact) */
type ContactRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Block of type Kontakt (contact) */
type ContactRecordaddressArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

type ContentModelLayoutField = {
  __typename?: 'ContentModelLayoutField';
  blocks: Array<Scalars['String']>;
  links: Array<Scalars['String']>;
  value: Scalars['JsonField'];
};

/** Block of type Innehåll (content) */
type ContentRecord = RecordInterface & {
  __typename?: 'ContentRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  layout?: Maybe<ContentModelLayoutField>;
  slug?: Maybe<Scalars['String']>;
  subTitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Innehåll (content) */
type ContentRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by creation datetime */
type CreatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

type EmployeeModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<EmployeeModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum EmployeeModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Personal (employee) */
type EmployeeRecord = RecordInterface & {
  __typename?: 'EmployeeRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Personal (employee) */
type EmployeeRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

enum FaviconType {
  appleTouchIcon = 'appleTouchIcon',
  icon = 'icon',
  msApplication = 'msApplication'
}

type FileField = FileFieldInterface & {
  __typename?: 'FileField';
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']>;
  customData: Scalars['CustomData'];
  exifInfo: Scalars['CustomData'];
  filename: Scalars['String'];
  focalPoint?: Maybe<focalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};


type FileFieldaltArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldblurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: InputMaybe<Scalars['Float']>;
  quality?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


type FileFieldcustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldfocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldresponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']>;
};


type FileFieldtitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldurlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

type FileFieldInterface = {
  _createdAt: Scalars['DateTime'];
  _updatedAt: Scalars['DateTime'];
  alt?: Maybe<Scalars['String']>;
  author?: Maybe<Scalars['String']>;
  basename: Scalars['String'];
  blurUpThumb?: Maybe<Scalars['String']>;
  blurhash?: Maybe<Scalars['String']>;
  colors: Array<ColorField>;
  copyright?: Maybe<Scalars['String']>;
  customData: Scalars['CustomData'];
  exifInfo: Scalars['CustomData'];
  filename: Scalars['String'];
  focalPoint?: Maybe<focalPoint>;
  format: Scalars['String'];
  height?: Maybe<Scalars['IntType']>;
  id: Scalars['UploadId'];
  md5: Scalars['String'];
  mimeType: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  responsiveImage?: Maybe<ResponsiveImage>;
  size: Scalars['IntType'];
  smartTags: Array<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url: Scalars['String'];
  video?: Maybe<UploadVideoField>;
  width?: Maybe<Scalars['IntType']>;
};


type FileFieldInterfacealtArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldInterfaceblurUpThumbArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
  punch?: InputMaybe<Scalars['Float']>;
  quality?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
};


type FileFieldInterfacecustomDataArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldInterfacefocalPointArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldInterfaceresponsiveImageArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  imgixParams?: InputMaybe<ImgixParams>;
  locale?: InputMaybe<SiteLocale>;
  sizes?: InputMaybe<Scalars['String']>;
};


type FileFieldInterfacetitleArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


type FileFieldInterfaceurlArgs = {
  imgixParams?: InputMaybe<ImgixParams>;
};

/** Specifies how to filter Single-file/image fields */
type FileFilter = {
  /** Search for records with an exact match. The specified value must be an Upload ID */
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that have one of the specified uploads */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude records with an exact match. The specified value must be an Upload ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Filter records that do not have one of the specified uploads */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** Record of type Sidfot (footer) */
type FooterRecord = RecordInterface & {
  __typename?: 'FooterRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  aboutKc?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Sidfot (footer) */
type FooterRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Sidfot (footer) */
type FooterRecordaboutKcArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

type ForArtistModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ForArtistModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum ForArtistModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type För konstnärer (for_artist) */
type ForArtistRecord = RecordInterface & {
  __typename?: 'ForArtistRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type För konstnärer (for_artist) */
type ForArtistRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type ForMemberModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ForMemberModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum ForMemberModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type For member (for_member) */
type ForMemberRecord = RecordInterface & {
  __typename?: 'ForMemberRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content: Array<ContentRecord>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type For member (for_member) */
type ForMemberRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Block of type Galleri (gallery) */
type GalleryRecord = RecordInterface & {
  __typename?: 'GalleryRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  images: Array<FileField>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Galleri (gallery) */
type GalleryRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type GlobalSeoField = {
  __typename?: 'GlobalSeoField';
  facebookPageUrl?: Maybe<Scalars['String']>;
  fallbackSeo?: Maybe<SeoField>;
  siteName?: Maybe<Scalars['String']>;
  titleSuffix?: Maybe<Scalars['String']>;
  twitterAccount?: Maybe<Scalars['String']>;
};

/** Block of type Bild(er) (image) */
type ImageRecord = RecordInterface & {
  __typename?: 'ImageRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image: Array<FileField>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Bild(er) (image) */
type ImageRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type ImgixParams = {
  /**
   * Aspect Ratio
   *
   * Specifies an aspect ratio to maintain when resizing and cropping the image
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/ar)
   */
  ar?: InputMaybe<Scalars['String']>;
  /**
   * Automatic
   *
   * Applies automatic enhancements to images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/auto)
   */
  auto?: InputMaybe<Array<ImgixParamsAuto>>;
  /**
   * Background Color
   *
   * Colors the background of padded and partially-transparent images.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/bg)
   */
  bg?: InputMaybe<Scalars['String']>;
  /**
   * Blend
   *
   * Specifies the location of the blend image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend)
   */
  blend?: InputMaybe<Scalars['String']>;
  /**
   * Blend Align
   *
   * Changes the blend alignment relative to the parent image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-align)
   */
  blendAlign?: InputMaybe<Array<ImgixParamsBlendAlign>>;
  /**
   * Blend Alpha
   *
   * Changes the alpha of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-alpha)
   */
  blendAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Color
   *
   * Specifies a color to use when applying the blend.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-color)
   */
  blendColor?: InputMaybe<Scalars['String']>;
  /**
   * Blend Crop
   *
   * Specifies the type of crop for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-crop)
   */
  blendCrop?: InputMaybe<Array<ImgixParamsBlendCrop>>;
  /**
   * Blend Fit
   *
   * Specifies the fit mode for blend images.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-fit)
   */
  blendFit?: InputMaybe<ImgixParamsBlendFit>;
  /**
   * Blend Height
   *
   * Adjusts the height of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-h)
   */
  blendH?: InputMaybe<Scalars['FloatType']>;
  /**
   * Blend Mode
   *
   * Sets the blend mode for a blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-mode)
   */
  blendMode?: InputMaybe<ImgixParamsBlendMode>;
  /**
   * Blend Padding
   *
   * Applies padding to the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-pad)
   */
  blendPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Size
   *
   * Adjusts the size of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-size)
   */
  blendSize?: InputMaybe<ImgixParamsBlendSize>;
  /**
   * Blend Width
   *
   * Adjusts the width of the blend image.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-w)
   */
  blendW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Blend X Position
   *
   * Adjusts the x-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-x)
   */
  blendX?: InputMaybe<Scalars['IntType']>;
  /**
   * Blend Y Position
   *
   * Adjusts the y-offset of the blend image relative to its parent.
   *
   * Depends on: `blend`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/blending/blend-y)
   */
  blendY?: InputMaybe<Scalars['IntType']>;
  /**
   * Gaussian Blur
   *
   * Applies a gaussian blur to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/blur)
   */
  blur?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Size & Color
   *
   * Applies a border to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border)
   */
  border?: InputMaybe<Scalars['String']>;
  /**
   * Border Bottom
   *
   * Sets bottom border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-bottom)
   */
  borderBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Left
   *
   * Sets left border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-left)
   */
  borderLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Outer Border Radius
   *
   * Sets the outer radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius)
   */
  borderRadius?: InputMaybe<Scalars['String']>;
  /**
   * Inner Border Radius
   *
   * Sets the inner radius of the image's border in pixels.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-radius-inner)
   */
  borderRadiusInner?: InputMaybe<Scalars['String']>;
  /**
   * Border Right
   *
   * Sets right border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-right)
   */
  borderRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Border Top
   *
   * Sets top border of an image.
   *
   * Depends on: `border`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/border-top)
   */
  borderTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Brightness
   *
   * Adjusts the brightness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/bri)
   */
  bri?: InputMaybe<Scalars['IntType']>;
  /**
   * Client Hints
   *
   * Sets one or more Client-Hints headers
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/ch)
   */
  ch?: InputMaybe<Array<ImgixParamsCh>>;
  /**
   * Chroma Subsampling
   *
   * Specifies the output chroma subsampling rate.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/chromasub)
   */
  chromasub?: InputMaybe<Scalars['IntType']>;
  /**
   * Color Quantization
   *
   * Limits the number of unique colors in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/colorquant)
   */
  colorquant?: InputMaybe<Scalars['IntType']>;
  /**
   * Palette Color Count
   *
   * Specifies how many colors to include in a palette-extraction response.
   *
   * Depends on: `palette`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/colors)
   */
  colors?: InputMaybe<Scalars['IntType']>;
  /**
   * Contrast
   *
   * Adjusts the contrast of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/con)
   */
  con?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Corner Radius
   *
   * Specifies the radius value for a rounded corner mask.
   *
   * Depends on: `mask=corners`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/corner-radius)
   */
  cornerRadius?: InputMaybe<Scalars['String']>;
  /**
   * Crop Mode
   *
   * Specifies how to crop an image.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/crop)
   */
  crop?: InputMaybe<Array<ImgixParamsCrop>>;
  /**
   * Color Space
   *
   * Specifies the color space of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/cs)
   */
  cs?: InputMaybe<ImgixParamsCs>;
  /**
   * Download
   *
   * Forces a URL to use send-file in its response.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dl)
   */
  dl?: InputMaybe<Scalars['String']>;
  /**
   * Dots Per Inch
   *
   * Sets the DPI value in the EXIF header.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/dpi)
   */
  dpi?: InputMaybe<Scalars['IntType']>;
  /**
   * Device Pixel Ratio
   *
   * Adjusts the device-pixel ratio of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/dpr)
   */
  dpr?: InputMaybe<Scalars['FloatType']>;
  /**
   * Duotone
   *
   * Applies a duotone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone)
   */
  duotone?: InputMaybe<Scalars['String']>;
  /**
   * Duotone Alpha
   *
   * Changes the alpha of the duotone effect atop the source image.
   *
   * Depends on: `duotone`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/duotone-alpha)
   */
  duotoneAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Exposure
   *
   * Adjusts the exposure of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/exp)
   */
  exp?: InputMaybe<Scalars['IntType']>;
  /**
   * Url Expiration Timestamp
   *
   * A Unix timestamp specifying a UTC time. Requests made to this URL after that time will output a 404 status code.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/expires)
   */
  expires?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Index
   *
   * Selects a face to crop to.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faceindex)
   */
  faceindex?: InputMaybe<Scalars['IntType']>;
  /**
   * Face Padding
   *
   * Adjusts padding around a selected face.
   *
   * Depends on: `fit=facearea`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/facepad)
   */
  facepad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Json Face Data
   *
   * Specifies that face data should be included in output when combined with `fm=json`.
   *
   * Depends on: `fm=json`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/face-detection/faces)
   */
  faces?: InputMaybe<Scalars['IntType']>;
  /**
   * Fill Mode
   *
   * Determines how to fill in additional space created by the fit setting
   *
   * Depends on: `fit`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill)
   */
  fill?: InputMaybe<ImgixParamsFill>;
  /**
   * Fill Color
   *
   * Sets the fill color for images with additional space created by the fit setting
   *
   * Depends on: `fill=solid`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/fill-color)
   */
  fillColor?: InputMaybe<Scalars['String']>;
  /**
   * Resize Fit Mode
   *
   * Specifies how to map the source image to the output image dimensions.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/fit)
   */
  fit?: InputMaybe<ImgixParamsFit>;
  /**
   * Flip Axis
   *
   * Flips an image on a specified axis.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/flip)
   */
  flip?: InputMaybe<ImgixParamsFlip>;
  /**
   * Output Format
   *
   * Changes the format of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/fm)
   */
  fm?: InputMaybe<ImgixParamsFm>;
  /**
   * Focal Point Debug
   *
   * Displays crosshairs identifying the location of the set focal point
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-debug)
   */
  fpDebug?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Focal Point X Position
   *
   * Sets the relative horizontal value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-x)
   */
  fpX?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Y Position
   *
   * Sets the relative vertical value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-y)
   */
  fpY?: InputMaybe<Scalars['FloatType']>;
  /**
   * Focal Point Zoom
   *
   * Sets the relative zoom value for the focal point of an image
   *
   * Depends on: `fit=crop`, `crop=focalpoint`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/focalpoint-crop/fp-z)
   */
  fpZ?: InputMaybe<Scalars['FloatType']>;
  /**
   * Gamma
   *
   * Adjusts the gamma of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/gam)
   */
  gam?: InputMaybe<Scalars['IntType']>;
  /**
   * Grid Colors
   *
   * Sets grid colors for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridColors?: InputMaybe<Scalars['String']>;
  /**
   * Grid Size
   *
   * Sets grid size for the transparency checkerboard grid.
   *
   * Depends on: `transparency`
   */
  gridSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Height
   *
   * Adjusts the height of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/h)
   */
  h?: InputMaybe<Scalars['FloatType']>;
  /**
   * Highlight
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/high)
   */
  high?: InputMaybe<Scalars['IntType']>;
  /**
   * Halftone
   *
   * Applies a half-tone effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/htn)
   */
  htn?: InputMaybe<Scalars['IntType']>;
  /**
   * Hue Shift
   *
   * Adjusts the hue of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/hue)
   */
  hue?: InputMaybe<Scalars['IntType']>;
  /**
   * Invert
   *
   * Inverts the colors on the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/invert)
   */
  invert?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Iptc Passthrough
   *
   * Determine if IPTC data should be passed for JPEG images.
   */
  iptc?: InputMaybe<ImgixParamsIptc>;
  /**
   * Lossless Compression
   *
   * Specifies that the output image should be a lossless variant.
   *
   * Depends on: `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/lossless)
   */
  lossless?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Watermark Image Url
   *
   * Specifies the location of the watermark image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark)
   */
  mark?: InputMaybe<Scalars['String']>;
  /**
   * Watermark Alignment Mode
   *
   * Changes the watermark alignment relative to the parent image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-align)
   */
  markAlign?: InputMaybe<Array<ImgixParamsMarkAlign>>;
  /**
   * Watermark Alpha
   *
   * Changes the alpha of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-alpha)
   */
  markAlpha?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Base Url
   *
   * Changes base URL of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-base)
   */
  markBase?: InputMaybe<Scalars['String']>;
  /**
   * Watermark Fit Mode
   *
   * Specifies the fit mode for watermark images.
   *
   * Depends on: `mark`, `markw`, `markh`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-fit)
   */
  markFit?: InputMaybe<ImgixParamsMarkFit>;
  /**
   * Watermark Height
   *
   * Adjusts the height of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-h)
   */
  markH?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Padding
   *
   * Applies padding to the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-pad)
   */
  markPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Rotation
   *
   * Rotates a watermark or tiled watermarks by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-rot)
   */
  markRot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark Scale
   *
   * Adjusts the scale of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-scale)
   */
  markScale?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Tile
   *
   * Adds tiled watermark.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-tile)
   */
  markTile?: InputMaybe<ImgixParamsMarkTile>;
  /**
   * Watermark Width
   *
   * Adjusts the width of the watermark image.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-w)
   */
  markW?: InputMaybe<Scalars['FloatType']>;
  /**
   * Watermark X Position
   *
   * Adjusts the x-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-x)
   */
  markX?: InputMaybe<Scalars['IntType']>;
  /**
   * Watermark Y Position
   *
   * Adjusts the y-offset of the watermark image relative to its parent.
   *
   * Depends on: `mark`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/watermark/mark-y)
   */
  markY?: InputMaybe<Scalars['IntType']>;
  /**
   * Mask Type
   *
   * Defines the type of mask and specifies the URL if that type is selected.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask)
   */
  mask?: InputMaybe<Scalars['String']>;
  /**
   * Mask Background Color
   *
   * Colors the background of the transparent mask area of images
   *
   * Depends on: `mask`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/mask/mask-bg)
   */
  maskBg?: InputMaybe<Scalars['String']>;
  /**
   * Maximum Height
   *
   * Specifies the maximum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-height)
   */
  maxH?: InputMaybe<Scalars['IntType']>;
  /**
   * Maximum Width
   *
   * Specifies the maximum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/max-width)
   */
  maxW?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Height
   *
   * Specifies the minimum height of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-height)
   */
  minH?: InputMaybe<Scalars['IntType']>;
  /**
   * Minimum Width
   *
   * Specifies the minimum width of the output image in pixels.
   *
   * Depends on: `fit=crop`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/min-width)
   */
  minW?: InputMaybe<Scalars['IntType']>;
  /**
   * Monochrome
   *
   * Applies a monochrome effect to the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/monochrome)
   */
  monochrome?: InputMaybe<Scalars['String']>;
  /**
   * Noise Reduction Bound
   *
   * Reduces the noise in an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nr)
   */
  nr?: InputMaybe<Scalars['IntType']>;
  /**
   * Noise Reduction Sharpen
   *
   * Provides a threshold by which to sharpen an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/noise-reduction/nrs)
   */
  nrs?: InputMaybe<Scalars['IntType']>;
  /**
   * Orientation
   *
   * Changes the image orientation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/orient)
   */
  orient?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding
   *
   * Pads an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad)
   */
  pad?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Bottom
   *
   * Sets bottom padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-bottom)
   */
  padBottom?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Left
   *
   * Sets left padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-left)
   */
  padLeft?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Right
   *
   * Sets right padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-right)
   */
  padRight?: InputMaybe<Scalars['IntType']>;
  /**
   * Padding Top
   *
   * Sets top padding of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/border-and-padding/pad-top)
   */
  padTop?: InputMaybe<Scalars['IntType']>;
  /**
   * Pdf Page Number
   *
   * Selects a page from a PDF for display.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/page)
   */
  page?: InputMaybe<Scalars['IntType']>;
  /**
   * Color Palette Extraction
   *
   * Specifies an output format for palette-extraction.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/palette)
   */
  palette?: InputMaybe<ImgixParamsPalette>;
  /**
   * Pdf Annotation
   *
   * Enables or disables PDF annotation.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/pdf/pdf-annotation)
   */
  pdfAnnotation?: InputMaybe<Scalars['BooleanType']>;
  /**
   * Css Prefix
   *
   * Specifies a CSS prefix for all classes in palette-extraction.
   *
   * Depends on: `palette=css`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/color-palette/prefix)
   */
  prefix?: InputMaybe<Scalars['String']>;
  /**
   * Pixellate
   *
   * Applies a pixelation effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/px)
   */
  px?: InputMaybe<Scalars['IntType']>;
  /**
   * Output Quality
   *
   * Adjusts the quality of an output image.
   *
   * Depends on: `fm=jpg`, `fm=pjpg`, `fm=webp`, `fm=jxr`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/format/q)
   */
  q?: InputMaybe<Scalars['IntType']>;
  /**
   * Source Rectangle Region
   *
   * Crops an image to a specified rectangle.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/rect)
   */
  rect?: InputMaybe<Scalars['String']>;
  /**
   * Rotation
   *
   * Rotates an image by a specified number of degrees.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/rotation/rot)
   */
  rot?: InputMaybe<Scalars['FloatType']>;
  /**
   * Saturation
   *
   * Adjusts the saturation of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sat)
   */
  sat?: InputMaybe<Scalars['IntType']>;
  /**
   * Sepia Tone
   *
   * Applies a sepia effect to an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/stylize/sepia)
   */
  sepia?: InputMaybe<Scalars['IntType']>;
  /**
   * Shadow
   *
   * Adjusts the highlights of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/shad)
   */
  shad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Sharpen
   *
   * Adjusts the sharpness of the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/sharp)
   */
  sharp?: InputMaybe<Scalars['FloatType']>;
  /**
   * Transparency
   *
   * Adds checkerboard behind images which support transparency.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/fill/transparency)
   */
  transparency?: InputMaybe<ImgixParamsTransparency>;
  /**
   * Trim Image
   *
   * Trims the source image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim)
   */
  trim?: InputMaybe<ImgixParamsTrim>;
  /**
   * Trim Color
   *
   * Specifies a trim color on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-color)
   */
  trimColor?: InputMaybe<Scalars['String']>;
  /**
   * Trim Mean Difference
   *
   * Specifies the mean difference on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-md)
   */
  trimMd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Padding
   *
   * Pads the area of the source image before trimming.
   *
   * Depends on: `trim`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-pad)
   */
  trimPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Trim Standard Deviation
   *
   * Specifies the standard deviation on a trim operation.
   *
   * Depends on: `trim=auto`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-sd)
   */
  trimSd?: InputMaybe<Scalars['FloatType']>;
  /**
   * Trim Tolerance
   *
   * Specifies the tolerance on a trim operation.
   *
   * Depends on: `trim=color`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/trim/trim-tol)
   */
  trimTol?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text String
   *
   * Sets the text string to render.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt)
   */
  txt?: InputMaybe<Scalars['String']>;
  /**
   * Text Align
   *
   * Sets the vertical and horizontal alignment of rendered text relative to the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-align)
   */
  txtAlign?: InputMaybe<Array<ImgixParamsTxtAlign>>;
  /**
   * Text Clipping Mode
   *
   * Sets the clipping properties of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-clip)
   */
  txtClip?: InputMaybe<Array<ImgixParamsTxtClip>>;
  /**
   * Text Color
   *
   * Specifies the color of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-color)
   */
  txtColor?: InputMaybe<Scalars['String']>;
  /**
   * Text Fit Mode
   *
   * Specifies the fit approach for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-fit)
   */
  txtFit?: InputMaybe<ImgixParamsTxtFit>;
  /**
   * Text Font
   *
   * Selects a font for rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-font)
   */
  txtFont?: InputMaybe<Scalars['String']>;
  /**
   * Text Leading
   *
   * Sets the leading (line spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-lead)
   */
  txtLead?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Ligatures
   *
   * Controls the level of ligature substitution
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-lig)
   */
  txtLig?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline
   *
   * Outlines the rendered text with a specified color.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line)
   */
  txtLine?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Outline Color
   *
   * Specifies a text outline color.
   *
   * Depends on: `txt`, `txtline`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-line-color)
   */
  txtLineColor?: InputMaybe<Scalars['String']>;
  /**
   * Text Padding
   *
   * Specifies the padding (in device-independent pixels) between a textbox and the edges of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-pad)
   */
  txtPad?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Shadow
   *
   * Applies a shadow to rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-shad)
   */
  txtShad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Text Font Size
   *
   * Sets the font size of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-size)
   */
  txtSize?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Tracking
   *
   * Sets the tracking (letter spacing) for rendered text. Only works on the multi-line text endpoint.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/typesetting/txt-track)
   */
  txtTrack?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Width
   *
   * Sets the width of rendered text.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-width)
   */
  txtWidth?: InputMaybe<Scalars['IntType']>;
  /**
   * Text X Position
   *
   * Sets the horizontal (x) position of the text in pixels relative to the left edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-x)
   */
  txtX?: InputMaybe<Scalars['IntType']>;
  /**
   * Text Y Position
   *
   * Sets the vertical (y) position of the text in pixels relative to the top edge of the base image.
   *
   * Depends on: `txt`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/text/txt-y)
   */
  txtY?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask
   *
   * Sharpens the source image using an unsharp mask.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usm)
   */
  usm?: InputMaybe<Scalars['IntType']>;
  /**
   * Unsharp Mask Radius
   *
   * Specifies the radius for an unsharp mask operation.
   *
   * Depends on: `usm`
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/usmrad)
   */
  usmrad?: InputMaybe<Scalars['FloatType']>;
  /**
   * Vibrance
   *
   * Adjusts the vibrance of an image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/adjustment/vib)
   */
  vib?: InputMaybe<Scalars['IntType']>;
  /**
   * Image Width
   *
   * Adjusts the width of the output image.
   *
   * [Open Imgix reference »](https://docs.imgix.com/apis/url/size/w)
   */
  w?: InputMaybe<Scalars['FloatType']>;
};

enum ImgixParamsAuto {
  compress = 'compress',
  enhance = 'enhance',
  format = 'format',
  redeye = 'redeye'
}

enum ImgixParamsBlendAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

enum ImgixParamsBlendCrop {
  bottom = 'bottom',
  faces = 'faces',
  left = 'left',
  right = 'right',
  top = 'top'
}

enum ImgixParamsBlendFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  max = 'max',
  scale = 'scale'
}

enum ImgixParamsBlendMode {
  burn = 'burn',
  color = 'color',
  darken = 'darken',
  difference = 'difference',
  dodge = 'dodge',
  exclusion = 'exclusion',
  hardlight = 'hardlight',
  hue = 'hue',
  lighten = 'lighten',
  luminosity = 'luminosity',
  multiply = 'multiply',
  normal = 'normal',
  overlay = 'overlay',
  saturation = 'saturation',
  screen = 'screen',
  softlight = 'softlight'
}

enum ImgixParamsBlendSize {
  inherit = 'inherit'
}

enum ImgixParamsCh {
  dpr = 'dpr',
  saveData = 'saveData',
  width = 'width'
}

enum ImgixParamsCrop {
  bottom = 'bottom',
  edges = 'edges',
  entropy = 'entropy',
  faces = 'faces',
  focalpoint = 'focalpoint',
  left = 'left',
  right = 'right',
  top = 'top'
}

enum ImgixParamsCs {
  adobergb1998 = 'adobergb1998',
  srgb = 'srgb',
  strip = 'strip',
  tinysrgb = 'tinysrgb'
}

enum ImgixParamsFill {
  blur = 'blur',
  solid = 'solid'
}

enum ImgixParamsFit {
  clamp = 'clamp',
  clip = 'clip',
  crop = 'crop',
  facearea = 'facearea',
  fill = 'fill',
  fillmax = 'fillmax',
  max = 'max',
  min = 'min',
  scale = 'scale'
}

enum ImgixParamsFlip {
  h = 'h',
  hv = 'hv',
  v = 'v'
}

enum ImgixParamsFm {
  avif = 'avif',
  blurhash = 'blurhash',
  gif = 'gif',
  jp2 = 'jp2',
  jpg = 'jpg',
  json = 'json',
  jxr = 'jxr',
  mp4 = 'mp4',
  pjpg = 'pjpg',
  png = 'png',
  png8 = 'png8',
  png32 = 'png32',
  webm = 'webm',
  webp = 'webp'
}

enum ImgixParamsIptc {
  allow = 'allow',
  block = 'block'
}

enum ImgixParamsMarkAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

enum ImgixParamsMarkFit {
  clip = 'clip',
  crop = 'crop',
  fill = 'fill',
  max = 'max',
  scale = 'scale'
}

enum ImgixParamsMarkTile {
  grid = 'grid'
}

enum ImgixParamsPalette {
  css = 'css',
  json = 'json'
}

enum ImgixParamsTransparency {
  grid = 'grid'
}

enum ImgixParamsTrim {
  auto = 'auto',
  color = 'color'
}

enum ImgixParamsTxtAlign {
  bottom = 'bottom',
  center = 'center',
  left = 'left',
  middle = 'middle',
  right = 'right',
  top = 'top'
}

enum ImgixParamsTxtClip {
  ellipsis = 'ellipsis',
  end = 'end',
  middle = 'middle',
  start = 'start'
}

enum ImgixParamsTxtFit {
  max = 'max'
}

/** Record of type In english (in_english) */
type InEnglishRecord = RecordInterface & {
  __typename?: 'InEnglishRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type In english (in_english) */
type InEnglishRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by usage */
type InUseFilter = {
  /** Search uploads that are currently used by some record or not */
  eq?: InputMaybe<Scalars['BooleanType']>;
};

/** Record of type Våra initiativ (intro_initiative) */
type IntroInitiativeRecord = RecordInterface & {
  __typename?: 'IntroInitiativeRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  intro: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Våra initiativ (intro_initiative) */
type IntroInitiativeRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Våra initiativ (intro_initiative) */
type IntroInitiativeRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies how to filter by ID */
type ItemIdFilter = {
  /** Search the record with the specified ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Search records with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude the record with the specified ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Search records that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

enum ItemStatus {
  draft = 'draft',
  published = 'published',
  updated = 'updated'
}

/** Specifies how to filter JSON fields */
type JsonFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
};

/** Specifies how to filter Single-link fields */
type LinkFilter = {
  /** Search for records with an exact match. The specified value must be a Record ID */
  eq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records linked to one of the specified records */
  in?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Exclude records with an exact match. The specified value must be a Record ID */
  neq?: InputMaybe<Scalars['ItemId']>;
  /** Filter records not linked to one of the specified records */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

/** Specifies how to filter Multiple-links fields */
type LinksFilter = {
  /** Filter records linked to all of the specified records. The specified values must be Record IDs */
  allIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records linked to at least one of the specified records. The specified values must be Record IDs */
  anyIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Search for records with an exact match. The specified values must be Record IDs */
  eq?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records not linked to any of the specified records. The specified values must be Record IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['ItemId']>>>;
};

type MemberCategoryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<MemberCategoryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  categoryType?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum MemberCategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  categoryType_ASC = 'categoryType_ASC',
  categoryType_DESC = 'categoryType_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Typ av konst (member_category) */
type MemberCategoryRecord = RecordInterface & {
  __typename?: 'MemberCategoryRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  categoryType?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Typ av konst (member_category) */
type MemberCategoryRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type MemberModelContentField = ImageRecord | VideoRecord;

type MemberModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<MemberModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  application?: InputMaybe<LinkFilter>;
  bio?: InputMaybe<TextFilter>;
  birthPlace?: InputMaybe<StringFilter>;
  city?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  email?: InputMaybe<StringFilter>;
  firstName?: InputMaybe<StringFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  instagram?: InputMaybe<StringFilter>;
  lastName?: InputMaybe<StringFilter>;
  memberCategory?: InputMaybe<LinksFilter>;
  password?: InputMaybe<StringFilter>;
  region?: InputMaybe<LinkFilter>;
  resettoken?: InputMaybe<StringFilter>;
  slug?: InputMaybe<SlugFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  webpage?: InputMaybe<StringFilter>;
  yearOfBirth?: InputMaybe<StringFilter>;
};

enum MemberModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  birthPlace_ASC = 'birthPlace_ASC',
  birthPlace_DESC = 'birthPlace_DESC',
  city_ASC = 'city_ASC',
  city_DESC = 'city_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  firstName_ASC = 'firstName_ASC',
  firstName_DESC = 'firstName_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  instagram_ASC = 'instagram_ASC',
  instagram_DESC = 'instagram_DESC',
  lastName_ASC = 'lastName_ASC',
  lastName_DESC = 'lastName_DESC',
  password_ASC = 'password_ASC',
  password_DESC = 'password_DESC',
  resettoken_ASC = 'resettoken_ASC',
  resettoken_DESC = 'resettoken_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  webpage_ASC = 'webpage_ASC',
  webpage_DESC = 'webpage_DESC',
  yearOfBirth_ASC = 'yearOfBirth_ASC',
  yearOfBirth_DESC = 'yearOfBirth_DESC'
}

/** Record of type Medlem (member) */
type MemberRecord = RecordInterface & {
  __typename?: 'MemberRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  application?: Maybe<ApplicationRecord>;
  bio?: Maybe<Scalars['String']>;
  birthPlace?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  content: Array<MemberModelContentField>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  instagram?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  memberCategory: Array<MemberCategoryRecord>;
  password?: Maybe<Scalars['String']>;
  region: RegionRecord;
  resettoken?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  webpage?: Maybe<Scalars['String']>;
  yearOfBirth?: Maybe<Scalars['String']>;
};


/** Record of type Medlem (member) */
type MemberRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Medlem (member) */
type MemberRecordbioArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

type MembersNewsCategoryModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<MembersNewsCategoryModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  category?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  position?: InputMaybe<PositionFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum MembersNewsCategoryModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  category_ASC = 'category_ASC',
  category_DESC = 'category_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  position_ASC = 'position_ASC',
  position_DESC = 'position_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Medlemskategori (members_news_category) */
type MembersNewsCategoryRecord = RecordInterface & {
  __typename?: 'MembersNewsCategoryRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  position?: Maybe<Scalars['IntType']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Medlemskategori (members_news_category) */
type MembersNewsCategoryRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type MembersNewsModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<MembersNewsModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  category?: InputMaybe<LinkFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum MembersNewsModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Aktuellt (members_news) */
type MembersNewsRecord = RecordInterface & {
  __typename?: 'MembersNewsRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  category: MembersNewsCategoryRecord;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Aktuellt (members_news) */
type MembersNewsRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

enum MuxThumbnailFormatType {
  gif = 'gif',
  jpg = 'jpg',
  png = 'png'
}

type NewsModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<NewsModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  content?: InputMaybe<TextFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  intro?: InputMaybe<TextFilter>;
  region?: InputMaybe<LinkFilter>;
  slug?: InputMaybe<SlugFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum NewsModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Nyheter (news) */
type NewsRecord = RecordInterface & {
  __typename?: 'NewsRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  intro?: Maybe<Scalars['String']>;
  region: RegionRecord;
  slug?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Nyheter (news) */
type NewsRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Nyheter (news) */
type NewsRecordcontentArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};


/** Record of type Nyheter (news) */
type NewsRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies how to filter by image orientation */
type OrientationFilter = {
  /** Search uploads with the specified orientation */
  eq?: InputMaybe<UploadOrientation>;
  /** Exclude uploads with the specified orientation */
  neq?: InputMaybe<UploadOrientation>;
};

/** Specifies how to filter by position (sorted and tree-like collections) */
type PositionFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Filter records with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['IntType']>;
};

type ProjectModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<ProjectModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  image?: InputMaybe<FileFilter>;
  text?: InputMaybe<TextFilter>;
  title?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
  url?: InputMaybe<StringFilter>;
};

enum ProjectModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

/** Record of type Initiativ (project) */
type ProjectRecord = RecordInterface & {
  __typename?: 'ProjectRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  image?: Maybe<FileField>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  url?: Maybe<Scalars['String']>;
};


/** Record of type Initiativ (project) */
type ProjectRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Initiativ (project) */
type ProjectRecordtextArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies how to filter by publication datetime */
type PublishedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** The query root for this schema */
type Query = {
  __typename?: 'Query';
  /** Returns meta information regarding a record collection */
  _allAboutsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allApplicationsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allCommissionCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allCommissionsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allConsultsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allEmployeesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allForArtistsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allForMembersMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMemberCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMembersMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMembersNewsCategoriesMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allMembersNewsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allNewsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allProjectsMeta: CollectionMetadata;
  /** Returns meta information regarding a record collection */
  _allRegionsMeta: CollectionMetadata;
  /** Returns meta information regarding an assets collection */
  _allUploadsMeta?: Maybe<CollectionMetadata>;
  /** Returns the single instance record */
  _site: Site;
  /** Returns a specific record */
  about?: Maybe<AboutRecord>;
  /** Returns a collection of records */
  allAbouts: Array<AboutRecord>;
  /** Returns a collection of records */
  allApplications: Array<ApplicationRecord>;
  /** Returns a collection of records */
  allCommissionCategories: Array<CommissionCategoryRecord>;
  /** Returns a collection of records */
  allCommissions: Array<CommissionRecord>;
  /** Returns a collection of records */
  allConsults: Array<ConsultRecord>;
  /** Returns a collection of records */
  allEmployees: Array<EmployeeRecord>;
  /** Returns a collection of records */
  allForArtists: Array<ForArtistRecord>;
  /** Returns a collection of records */
  allForMembers: Array<ForMemberRecord>;
  /** Returns a collection of records */
  allMemberCategories: Array<MemberCategoryRecord>;
  /** Returns a collection of records */
  allMembers: Array<MemberRecord>;
  /** Returns a collection of records */
  allMembersNews: Array<MembersNewsRecord>;
  /** Returns a collection of records */
  allMembersNewsCategories: Array<MembersNewsCategoryRecord>;
  /** Returns a collection of records */
  allNews: Array<NewsRecord>;
  /** Returns a collection of records */
  allProjects: Array<ProjectRecord>;
  /** Returns a collection of records */
  allRegions: Array<RegionRecord>;
  /** Returns a collection of assets */
  allUploads: Array<FileField>;
  /** Returns a specific record */
  application?: Maybe<ApplicationRecord>;
  /** Returns the single instance record */
  apply?: Maybe<ApplyRecord>;
  /** Returns a specific record */
  commission?: Maybe<CommissionRecord>;
  /** Returns a specific record */
  commissionCategory?: Maybe<CommissionCategoryRecord>;
  /** Returns a specific record */
  consult?: Maybe<ConsultRecord>;
  /** Returns a specific record */
  employee?: Maybe<EmployeeRecord>;
  /** Returns the single instance record */
  footer?: Maybe<FooterRecord>;
  /** Returns a specific record */
  forArtist?: Maybe<ForArtistRecord>;
  /** Returns a specific record */
  forMember?: Maybe<ForMemberRecord>;
  /** Returns the single instance record */
  inEnglish?: Maybe<InEnglishRecord>;
  /** Returns the single instance record */
  introInitiative?: Maybe<IntroInitiativeRecord>;
  /** Returns a specific record */
  member?: Maybe<MemberRecord>;
  /** Returns a specific record */
  memberCategory?: Maybe<MemberCategoryRecord>;
  /** Returns a specific record */
  membersNews?: Maybe<MembersNewsRecord>;
  /** Returns a specific record */
  membersNewsCategory?: Maybe<MembersNewsCategoryRecord>;
  /** Returns a specific record */
  news?: Maybe<NewsRecord>;
  /** Returns a specific record */
  project?: Maybe<ProjectRecord>;
  /** Returns a specific record */
  region?: Maybe<RegionRecord>;
  /** Returns the single instance record */
  start?: Maybe<StartRecord>;
  /** Returns a specific asset */
  upload?: Maybe<FileField>;
};


/** The query root for this schema */
type Query_allAboutsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AboutModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allApplicationsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ApplicationModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allCommissionCategoriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allCommissionsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allConsultsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ConsultModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allEmployeesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<EmployeeModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allForArtistsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForArtistModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allForMembersMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForMemberModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allMemberCategoriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allMembersMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allMembersNewsCategoriesMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allMembersNewsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allNewsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allProjectsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ProjectModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allRegionsMetaArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RegionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_allUploadsMetaArgs = {
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type Query_siteArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QueryaboutArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AboutModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AboutModelOrderBy>>>;
};


/** The query root for this schema */
type QueryallAboutsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<AboutModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<AboutModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallApplicationsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ApplicationModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ApplicationModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallCommissionCategoriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CommissionCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallCommissionsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CommissionModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallConsultsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ConsultModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ConsultModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallEmployeesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<EmployeeModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<EmployeeModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallForArtistsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForArtistModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ForArtistModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallForMembersArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForMemberModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ForMemberModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallMemberCategoriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MemberCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallMembersArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MemberModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallMembersNewsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MembersNewsModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallMembersNewsCategoriesArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsCategoryModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MembersNewsCategoryModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallNewsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<NewsModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallProjectsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ProjectModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ProjectModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallRegionsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RegionModelFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<RegionModelOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryallUploadsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  first?: InputMaybe<Scalars['IntType']>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
  skip?: InputMaybe<Scalars['IntType']>;
};


/** The query root for this schema */
type QueryapplicationArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ApplicationModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ApplicationModelOrderBy>>>;
};


/** The query root for this schema */
type QueryapplyArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QuerycommissionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CommissionModelOrderBy>>>;
};


/** The query root for this schema */
type QuerycommissionCategoryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<CommissionCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<CommissionCategoryModelOrderBy>>>;
};


/** The query root for this schema */
type QueryconsultArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ConsultModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ConsultModelOrderBy>>>;
};


/** The query root for this schema */
type QueryemployeeArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<EmployeeModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<EmployeeModelOrderBy>>>;
};


/** The query root for this schema */
type QueryfooterArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QueryforArtistArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForArtistModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ForArtistModelOrderBy>>>;
};


/** The query root for this schema */
type QueryforMemberArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ForMemberModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ForMemberModelOrderBy>>>;
};


/** The query root for this schema */
type QueryinEnglishArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QueryintroInitiativeArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QuerymemberArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MemberModelOrderBy>>>;
};


/** The query root for this schema */
type QuerymemberCategoryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MemberCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MemberCategoryModelOrderBy>>>;
};


/** The query root for this schema */
type QuerymembersNewsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MembersNewsModelOrderBy>>>;
};


/** The query root for this schema */
type QuerymembersNewsCategoryArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<MembersNewsCategoryModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<MembersNewsCategoryModelOrderBy>>>;
};


/** The query root for this schema */
type QuerynewsArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<NewsModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<NewsModelOrderBy>>>;
};


/** The query root for this schema */
type QueryprojectArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<ProjectModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<ProjectModelOrderBy>>>;
};


/** The query root for this schema */
type QueryregionArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<RegionModelFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<RegionModelOrderBy>>>;
};


/** The query root for this schema */
type QuerystartArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};


/** The query root for this schema */
type QueryuploadArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  filter?: InputMaybe<UploadFilter>;
  locale?: InputMaybe<SiteLocale>;
  orderBy?: InputMaybe<Array<InputMaybe<UploadOrderBy>>>;
};

type RecordInterface = {
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
};


type RecordInterface_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type RegionModelFilter = {
  OR?: InputMaybe<Array<InputMaybe<RegionModelFilter>>>;
  _createdAt?: InputMaybe<CreatedAtFilter>;
  _firstPublishedAt?: InputMaybe<PublishedAtFilter>;
  _isValid?: InputMaybe<BooleanFilter>;
  _publicationScheduledAt?: InputMaybe<PublishedAtFilter>;
  _publishedAt?: InputMaybe<PublishedAtFilter>;
  _status?: InputMaybe<StatusFilter>;
  _unpublishingScheduledAt?: InputMaybe<PublishedAtFilter>;
  _updatedAt?: InputMaybe<UpdatedAtFilter>;
  createdAt?: InputMaybe<CreatedAtFilter>;
  id?: InputMaybe<ItemIdFilter>;
  name?: InputMaybe<StringFilter>;
  slug?: InputMaybe<SlugFilter>;
  updatedAt?: InputMaybe<UpdatedAtFilter>;
};

enum RegionModelOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _firstPublishedAt_ASC = '_firstPublishedAt_ASC',
  _firstPublishedAt_DESC = '_firstPublishedAt_DESC',
  _isValid_ASC = '_isValid_ASC',
  _isValid_DESC = '_isValid_DESC',
  _publicationScheduledAt_ASC = '_publicationScheduledAt_ASC',
  _publicationScheduledAt_DESC = '_publicationScheduledAt_DESC',
  _publishedAt_ASC = '_publishedAt_ASC',
  _publishedAt_DESC = '_publishedAt_DESC',
  _status_ASC = '_status_ASC',
  _status_DESC = '_status_DESC',
  _unpublishingScheduledAt_ASC = '_unpublishingScheduledAt_ASC',
  _unpublishingScheduledAt_DESC = '_unpublishingScheduledAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  createdAt_ASC = 'createdAt_ASC',
  createdAt_DESC = 'createdAt_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  updatedAt_ASC = 'updatedAt_ASC',
  updatedAt_DESC = 'updatedAt_DESC'
}

/** Record of type Region (region) */
type RegionRecord = RecordInterface & {
  __typename?: 'RegionRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  name: Scalars['String'];
  section: Array<Scalars['String']>;
  slug: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


/** Record of type Region (region) */
type RegionRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

/** Specifies how to filter by upload type */
type ResolutionFilter = {
  /** Search uploads with the specified resolution */
  eq?: InputMaybe<ResolutionType>;
  /** Search uploads with the specified resolutions */
  in?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
  /** Exclude uploads with the specified resolution */
  neq?: InputMaybe<ResolutionType>;
  /** Search uploads without the specified resolutions */
  notIn?: InputMaybe<Array<InputMaybe<ResolutionType>>>;
};

enum ResolutionType {
  icon = 'icon',
  large = 'large',
  medium = 'medium',
  small = 'small'
}

type ResponsiveImage = {
  __typename?: 'ResponsiveImage';
  alt?: Maybe<Scalars['String']>;
  aspectRatio: Scalars['FloatType'];
  base64?: Maybe<Scalars['String']>;
  bgColor?: Maybe<Scalars['String']>;
  height: Scalars['IntType'];
  sizes: Scalars['String'];
  src: Scalars['String'];
  srcSet: Scalars['String'];
  title?: Maybe<Scalars['String']>;
  webpSrcSet: Scalars['String'];
  width: Scalars['IntType'];
};

type SeoField = {
  __typename?: 'SeoField';
  description?: Maybe<Scalars['String']>;
  image?: Maybe<FileField>;
  title?: Maybe<Scalars['String']>;
  twitterCard?: Maybe<Scalars['String']>;
};

type Site = {
  __typename?: 'Site';
  favicon?: Maybe<FileField>;
  faviconMetaTags: Array<Tag>;
  globalSeo?: Maybe<GlobalSeoField>;
  locales: Array<SiteLocale>;
};


type SitefaviconMetaTagsArgs = {
  variants?: InputMaybe<Array<InputMaybe<FaviconType>>>;
};


type SiteglobalSeoArgs = {
  fallbackLocales?: InputMaybe<Array<SiteLocale>>;
  locale?: InputMaybe<SiteLocale>;
};

enum SiteLocale {
  en = 'en'
}

/** Specifies how to filter Slug fields */
type SlugFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records that have one of the specified slugs */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do have one of the specified slugs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Record of type Start (start) */
type StartRecord = RecordInterface & {
  __typename?: 'StartRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  headline?: Maybe<Scalars['String']>;
  id: Scalars['ItemId'];
  intro?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Record of type Start (start) */
type StartRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Record of type Start (start) */
type StartRecordintroArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies how to filter by status */
type StatusFilter = {
  /** Search the record with the specified status */
  eq?: InputMaybe<ItemStatus>;
  /** Search records with the specified statuses */
  in?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
  /** Exclude the record with the specified status */
  neq?: InputMaybe<ItemStatus>;
  /** Search records without the specified statuses */
  notIn?: InputMaybe<Array<InputMaybe<ItemStatus>>>;
};

/** Specifies how to filter Single-line string fields */
type StringFilter = {
  /** Search for records with an exact match */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records that equal one of the specified values */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records with an exact match */
  neq?: InputMaybe<Scalars['String']>;
  /** Filter records that do not equal one of the specified values */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

type StringMatchesFilter = {
  caseSensitive?: InputMaybe<Scalars['BooleanType']>;
  pattern: Scalars['String'];
  regexp?: InputMaybe<Scalars['BooleanType']>;
};

/** Specifies how to filter Structured Text fields */
type StructuredTextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field set as blank (null or single empty paragraph) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

type Tag = {
  __typename?: 'Tag';
  attributes?: Maybe<Scalars['MetaTagAttributes']>;
  content?: Maybe<Scalars['String']>;
  tag: Scalars['String'];
};

/** Specifies how to filter text fields */
type TextFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with the specified field set as blank (null or empty string) */
  isBlank?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude records based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

type TextModelLinkField = AboutRecord | ApplyRecord;

/** Block of type Text (text) */
type TextRecord = RecordInterface & {
  __typename?: 'TextRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  link?: Maybe<TextModelLinkField>;
  text?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};


/** Block of type Text (text) */
type TextRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};


/** Block of type Text (text) */
type TextRecordtextArgs = {
  markdown?: InputMaybe<Scalars['Boolean']>;
};

/** Specifies how to filter by upload type */
type TypeFilter = {
  /** Search uploads with the specified type */
  eq?: InputMaybe<UploadType>;
  /** Search uploads with the specified types */
  in?: InputMaybe<Array<InputMaybe<UploadType>>>;
  /** Exclude uploads with the specified type */
  neq?: InputMaybe<UploadType>;
  /** Search uploads without the specified types */
  notIn?: InputMaybe<Array<InputMaybe<UploadType>>>;
};

/** Specifies how to filter by update datetime */
type UpdatedAtFilter = {
  /** Filter records with a value that's within the specified minute range. Seconds and milliseconds are truncated from the argument. */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter records with a value that's strictly greater than the one specified. Seconds and milliseconds are truncated from the argument. */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's greater than or equal to than the one specified. Seconds and milliseconds are truncated from the argument. */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less than the one specified. Seconds and milliseconds are truncated from the argument. */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's less or equal than the one specified. Seconds and milliseconds are truncated from the argument. */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Filter records with a value that's outside the specified minute range. Seconds and milliseconds are truncated from the argument. */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by default alt */
type UploadAltFilter = {
  /** Search the uploads with the specified alt */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search uploads with the specified values as default alt */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the uploads with the specified alt */
  neq?: InputMaybe<Scalars['String']>;
  /** Search uploads that do not have the specified values as default alt */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by auhtor */
type UploadAuthorFilter = {
  /** Filter uploads with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by basename */
type UploadBasenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by colors */
type UploadColorsFilter = {
  /** Filter uploads that have all of the specified colors */
  allIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have at least one of the specified colors */
  anyIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that have the specified colors */
  contains?: InputMaybe<ColorBucketType>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
  /** Filter uploads that do not have any of the specified colors */
  notIn?: InputMaybe<Array<InputMaybe<ColorBucketType>>>;
};

/** Specifies how to filter by copyright */
type UploadCopyrightFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by creation datetime */
type UploadCreatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

/** Specifies how to filter by filename */
type UploadFilenameFilter = {
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

type UploadFilter = {
  OR?: InputMaybe<Array<InputMaybe<UploadFilter>>>;
  _createdAt?: InputMaybe<UploadCreatedAtFilter>;
  _updatedAt?: InputMaybe<UploadUpdatedAtFilter>;
  alt?: InputMaybe<UploadAltFilter>;
  author?: InputMaybe<UploadAuthorFilter>;
  basename?: InputMaybe<UploadBasenameFilter>;
  colors?: InputMaybe<UploadColorsFilter>;
  copyright?: InputMaybe<UploadCopyrightFilter>;
  filename?: InputMaybe<UploadFilenameFilter>;
  format?: InputMaybe<UploadFormatFilter>;
  height?: InputMaybe<UploadHeightFilter>;
  id?: InputMaybe<UploadIdFilter>;
  inUse?: InputMaybe<InUseFilter>;
  md5?: InputMaybe<UploadMd5Filter>;
  mimeType?: InputMaybe<UploadMimeTypeFilter>;
  notes?: InputMaybe<UploadNotesFilter>;
  orientation?: InputMaybe<OrientationFilter>;
  resolution?: InputMaybe<ResolutionFilter>;
  size?: InputMaybe<UploadSizeFilter>;
  smartTags?: InputMaybe<UploadTagsFilter>;
  tags?: InputMaybe<UploadTagsFilter>;
  title?: InputMaybe<UploadTitleFilter>;
  type?: InputMaybe<TypeFilter>;
  width?: InputMaybe<UploadWidthFilter>;
};

/** Specifies how to filter by format */
type UploadFormatFilter = {
  /** Search the asset with the specified format */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified formats */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified format */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified formats */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by height */
type UploadHeightFilter = {
  /** Search assets with the specified height */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified height */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified height */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified height */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified height */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by ID */
type UploadIdFilter = {
  /** Search the asset with the specified ID */
  eq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets with the specified IDs */
  in?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
  /** Exclude the asset with the specified ID */
  neq?: InputMaybe<Scalars['UploadId']>;
  /** Search assets that do not have the specified IDs */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['UploadId']>>>;
};

/** Specifies how to filter by MD5 */
type UploadMd5Filter = {
  /** Search the asset with the specified MD5 */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified MD5s */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude the asset with the specified MD5 */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified MD5s */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

/** Specifies how to filter by mime type */
type UploadMimeTypeFilter = {
  /** Search the asset with the specified mime type */
  eq?: InputMaybe<Scalars['String']>;
  /** Search assets with the specified mime types */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified mime type */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified mime types */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

/** Specifies how to filter by notes */
type UploadNotesFilter = {
  /** Filter records with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

enum UploadOrderBy {
  _createdAt_ASC = '_createdAt_ASC',
  _createdAt_DESC = '_createdAt_DESC',
  _updatedAt_ASC = '_updatedAt_ASC',
  _updatedAt_DESC = '_updatedAt_DESC',
  basename_ASC = 'basename_ASC',
  basename_DESC = 'basename_DESC',
  filename_ASC = 'filename_ASC',
  filename_DESC = 'filename_DESC',
  format_ASC = 'format_ASC',
  format_DESC = 'format_DESC',
  id_ASC = 'id_ASC',
  id_DESC = 'id_DESC',
  mimeType_ASC = 'mimeType_ASC',
  mimeType_DESC = 'mimeType_DESC',
  resolution_ASC = 'resolution_ASC',
  resolution_DESC = 'resolution_DESC',
  size_ASC = 'size_ASC',
  size_DESC = 'size_DESC'
}

enum UploadOrientation {
  landscape = 'landscape',
  portrait = 'portrait',
  square = 'square'
}

/** Specifies how to filter by size */
type UploadSizeFilter = {
  /** Search assets with the specified size (in bytes) */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified size (in bytes) */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified size (in bytes) */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified size (in bytes) */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified size (in bytes) */
  neq?: InputMaybe<Scalars['IntType']>;
};

/** Specifies how to filter by tags */
type UploadTagsFilter = {
  /** Filter uploads linked to all of the specified tags */
  allIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to at least one of the specified tags */
  anyIn?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads linked to the specified tag */
  contains?: InputMaybe<Scalars['String']>;
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Array<Scalars['String']>>;
  /** Filter uploads not linked to any of the specified tags */
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

/** Specifies how to filter by default title */
type UploadTitleFilter = {
  /** Search the asset with the specified title */
  eq?: InputMaybe<Scalars['String']>;
  /** Filter assets with the specified field defined (i.e. with any value) or not */
  exists?: InputMaybe<Scalars['BooleanType']>;
  /** Search assets with the specified as default title */
  in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Filter uploads based on a regular expression */
  matches?: InputMaybe<StringMatchesFilter>;
  /** Exclude the asset with the specified title */
  neq?: InputMaybe<Scalars['String']>;
  /** Search assets that do not have the specified as default title */
  notIn?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Exclude uploads based on a regular expression */
  notMatches?: InputMaybe<StringMatchesFilter>;
};

enum UploadType {
  archive = 'archive',
  audio = 'audio',
  image = 'image',
  pdfdocument = 'pdfdocument',
  presentation = 'presentation',
  richtext = 'richtext',
  spreadsheet = 'spreadsheet',
  video = 'video'
}

/** Specifies how to filter by update datetime */
type UploadUpdatedAtFilter = {
  /** Search for uploads with an exact match */
  eq?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's strictly greater than the one specified */
  gt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's greater than or equal to the one specified */
  gte?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less than the one specified */
  lt?: InputMaybe<Scalars['DateTime']>;
  /** Filter uploads with a value that's less or equal than the one specified */
  lte?: InputMaybe<Scalars['DateTime']>;
  /** Exclude uploads with an exact match */
  neq?: InputMaybe<Scalars['DateTime']>;
};

type UploadVideoField = {
  __typename?: 'UploadVideoField';
  duration?: Maybe<Scalars['Int']>;
  framerate?: Maybe<Scalars['Int']>;
  mp4Url?: Maybe<Scalars['String']>;
  muxAssetId: Scalars['String'];
  muxPlaybackId: Scalars['String'];
  streamingUrl: Scalars['String'];
  thumbnailUrl: Scalars['String'];
};


type UploadVideoFieldmp4UrlArgs = {
  exactRes?: InputMaybe<VideoMp4Res>;
  res?: InputMaybe<VideoMp4Res>;
};


type UploadVideoFieldthumbnailUrlArgs = {
  format?: InputMaybe<MuxThumbnailFormatType>;
};

/** Specifies how to filter by width */
type UploadWidthFilter = {
  /** Search assets with the specified width */
  eq?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger than the specified width */
  gt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  gte?: InputMaybe<Scalars['IntType']>;
  /** Search all assets smaller than the specified width */
  lt?: InputMaybe<Scalars['IntType']>;
  /** Search all assets larger or equal to the specified width */
  lte?: InputMaybe<Scalars['IntType']>;
  /** Search assets that do not have the specified width */
  neq?: InputMaybe<Scalars['IntType']>;
};

type VideoField = {
  __typename?: 'VideoField';
  height: Scalars['IntType'];
  provider: Scalars['String'];
  providerUid: Scalars['String'];
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  width: Scalars['IntType'];
};

enum VideoMp4Res {
  high = 'high',
  low = 'low',
  medium = 'medium'
}

/** Block of type Video (video) */
type VideoRecord = RecordInterface & {
  __typename?: 'VideoRecord';
  _createdAt: Scalars['DateTime'];
  _firstPublishedAt?: Maybe<Scalars['DateTime']>;
  _isValid: Scalars['BooleanType'];
  _modelApiKey: Scalars['String'];
  _publicationScheduledAt?: Maybe<Scalars['DateTime']>;
  _publishedAt?: Maybe<Scalars['DateTime']>;
  /** SEO meta tags */
  _seoMetaTags: Array<Tag>;
  _status: ItemStatus;
  _unpublishingScheduledAt?: Maybe<Scalars['DateTime']>;
  _updatedAt: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ItemId'];
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  video?: Maybe<VideoField>;
};


/** Block of type Video (video) */
type VideoRecord_seoMetaTagsArgs = {
  locale?: InputMaybe<SiteLocale>;
};

type focalPoint = {
  __typename?: 'focalPoint';
  x: Scalars['FloatType'];
  y: Scalars['FloatType'];
};

type AboutQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


type AboutQuery = { __typename?: 'Query', about?: { __typename?: 'AboutRecord', id: any, title: string, intro?: string | null, slug: string, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'AboutModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null } | null };

type AllAboutsQueryVariables = Exact<{ [key: string]: never; }>;


type AllAboutsQuery = { __typename?: 'Query', abouts: Array<{ __typename?: 'AboutRecord', id: any, title: string, intro?: string | null, slug: string, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'AboutModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null }> };

type AllAboutsMenuQueryVariables = Exact<{ [key: string]: never; }>;


type AllAboutsMenuQuery = { __typename?: 'Query', abouts: Array<{ __typename?: 'AboutRecord', title: string, slug: string }> };

type CommissionQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


type CommissionQuery = { __typename?: 'Query', commission?: { __typename?: 'CommissionRecord', id: any, title?: string | null, intro?: string | null, slug?: string | null, city?: string | null, year?: string | null, artist?: string | null, consultant?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, category: { __typename?: 'CommissionCategoryRecord', id: any, title?: string | null }, content: Array<{ __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null };

type AllCommissionsQueryVariables = Exact<{ [key: string]: never; }>;


type AllCommissionsQuery = { __typename?: 'Query', commissions: Array<{ __typename?: 'CommissionRecord', id: any, title?: string | null, slug?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null, category: { __typename?: 'CommissionCategoryRecord', id: any, title?: string | null } }> };

type AllCommissionsMenuQueryVariables = Exact<{ [key: string]: never; }>;


type AllCommissionsMenuQuery = { __typename?: 'Query', commissions: Array<{ __typename?: 'CommissionRecord', title?: string | null, slug?: string | null }> };

type AllCommissionCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


type AllCommissionCategoriesQuery = { __typename?: 'Query', commissionCategories: Array<{ __typename?: 'CommissionCategoryRecord', id: any, title?: string | null }> };

type ConsultQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


type ConsultQuery = { __typename?: 'Query', consult?: { __typename?: 'ConsultRecord', id: any, title?: string | null, intro?: string | null, slug?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'ConsultModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'GalleryRecord', id: any } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null } | null };

type AllConsultsQueryVariables = Exact<{ [key: string]: never; }>;


type AllConsultsQuery = { __typename?: 'Query', consults: Array<{ __typename?: 'ConsultRecord', id: any, title?: string | null, intro?: string | null, slug?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'ConsultModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'GalleryRecord', id: any } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null }> };

type AllConsultsMenuQueryVariables = Exact<{ [key: string]: never; }>;


type AllConsultsMenuQuery = { __typename?: 'Query', consults: Array<{ __typename?: 'ConsultRecord', title?: string | null, slug?: string | null }> };

type FooterQueryVariables = Exact<{ [key: string]: never; }>;


type FooterQuery = { __typename?: 'Query', footer?: { __typename?: 'FooterRecord', aboutKc?: string | null } | null };

type AboutFragment = { __typename?: 'AboutRecord', id: any, title: string, intro?: string | null, slug: string, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'AboutModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null };

type CommissionFragment = { __typename?: 'CommissionRecord', id: any, title?: string | null, intro?: string | null, slug?: string | null, city?: string | null, year?: string | null, artist?: string | null, consultant?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, category: { __typename?: 'CommissionCategoryRecord', id: any, title?: string | null }, content: Array<{ __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> };

type CommissionFragmentLightFragment = { __typename?: 'CommissionRecord', id: any, title?: string | null, slug?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null, category: { __typename?: 'CommissionCategoryRecord', id: any, title?: string | null } };

type ConsultFragment = { __typename?: 'ConsultRecord', id: any, title?: string | null, intro?: string | null, slug?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, content?: { __typename?: 'ConsultModelContentField', value: any, blocks: Array<{ __typename: 'ButtonRecord', id: any, text?: string | null, url?: string | null } | { __typename: 'GalleryRecord', id: any } | { __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null };

type ImageFragment = { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null };

type ImageMediumFragment = { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, base64?: string | null, bgColor?: string | null, sizes: string } | null };

type ImageThumbnailFragment = { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null };

type MemberFragment = { __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, bio?: string | null, yearOfBirth?: string | null, birthPlace?: string | null, city?: string | null, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, memberCategory: Array<{ __typename?: 'MemberCategoryRecord', id: any, categoryType?: string | null }>, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null, content: Array<{ __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> };

type MemberFragmentLightFragment = { __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null };

type NewsFragment = { __typename?: 'NewsRecord', id: any, title?: string | null, content?: string | null, slug?: string | null, intro?: string | null, createdAt: any, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string } };

type ProjectFragment = { __typename?: 'ProjectRecord', title?: string | null, url?: string | null, text?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, base64?: string | null, bgColor?: string | null, sizes: string } | null } | null };

type RegionFragment = { __typename?: 'RegionRecord', id: any, name: string, slug: string };

type SiteFragment = { __typename?: 'Site', favicon: Array<{ __typename?: 'Tag', attributes?: any | null, content?: string | null, tag: string }>, globalSeo?: { __typename?: 'GlobalSeoField', facebookPageUrl?: string | null, siteName?: string | null, titleSuffix?: string | null, twitterAccount?: string | null, fallbackSeo?: { __typename?: 'SeoField', description?: string | null, title?: string | null, twitterCard?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null } | null } | null };

type VideoFragment = { __typename?: 'FileField', id: any, alt?: string | null, basename: string, format: string, mimeType: string, size: any, title?: string | null, url: string, width?: any | null, height?: any | null, video?: { __typename?: 'UploadVideoField', thumbnailUrl: string, streamingUrl: string, framerate?: number | null, duration?: number | null, mp4high?: string | null, mp4med?: string | null, mp4low?: string | null } | null };

type GlobalQueryVariables = Exact<{ [key: string]: never; }>;


type GlobalQuery = { __typename?: 'Query', site: { __typename?: 'Site', favicon: Array<{ __typename?: 'Tag', attributes?: any | null, content?: string | null, tag: string }>, globalSeo?: { __typename?: 'GlobalSeoField', facebookPageUrl?: string | null, siteName?: string | null, titleSuffix?: string | null, twitterAccount?: string | null, fallbackSeo?: { __typename?: 'SeoField', description?: string | null, title?: string | null, twitterCard?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null } | null } | null } };

type AllMembersQueryVariables = Exact<{ [key: string]: never; }>;


type AllMembersQuery = { __typename?: 'Query', members: Array<{ __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null }> };

type AllMembersWithPortfolioQueryVariables = Exact<{ [key: string]: never; }>;


type AllMembersWithPortfolioQuery = { __typename?: 'Query', members: Array<{ __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null }> };

type MemberQueryVariables = Exact<{
  email: Scalars['String'];
}>;


type MemberQuery = { __typename?: 'Query', member?: { __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, bio?: string | null, yearOfBirth?: string | null, birthPlace?: string | null, city?: string | null, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, memberCategory: Array<{ __typename?: 'MemberCategoryRecord', id: any, categoryType?: string | null }>, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null, content: Array<{ __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null };

type MemberBySlugQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


type MemberBySlugQuery = { __typename?: 'Query', member?: { __typename?: 'MemberRecord', id: any, firstName: string, lastName: string, email: string, bio?: string | null, yearOfBirth?: string | null, birthPlace?: string | null, city?: string | null, slug?: string | null, _status: ItemStatus, _firstPublishedAt?: any | null, memberCategory: Array<{ __typename?: 'MemberCategoryRecord', id: any, categoryType?: string | null }>, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string }, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null } | null } | null, content: Array<{ __typename: 'ImageRecord', id: any, image: Array<{ __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null }> } | { __typename: 'VideoRecord', id: any, video?: { __typename?: 'VideoField', height: any, width: any, title: string, provider: string, providerUid: string, thumbnailUrl: string, url: string } | null }> } | null };

type MemberByPasswordTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


type MemberByPasswordTokenQuery = { __typename?: 'Query', member?: { __typename?: 'MemberRecord', id: any, email: string, firstName: string, lastName: string } | null };

type AllMemberCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


type AllMemberCategoriesQuery = { __typename?: 'Query', memberCategories: Array<{ __typename?: 'MemberCategoryRecord', id: any, categoryType?: string | null }> };

type AllNewsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']>;
  skip?: InputMaybe<Scalars['IntType']>;
}>;


type AllNewsQuery = { __typename?: 'Query', news: Array<{ __typename?: 'NewsRecord', id: any, title?: string | null, content?: string | null, slug?: string | null, intro?: string | null, createdAt: any, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string } }>, pagination: { __typename?: 'CollectionMetadata', count: any } };

type AllNewsByRegionQueryVariables = Exact<{
  first?: InputMaybe<Scalars['IntType']>;
  skip?: InputMaybe<Scalars['IntType']>;
  id?: InputMaybe<Scalars['ItemId']>;
}>;


type AllNewsByRegionQuery = { __typename?: 'Query', news: Array<{ __typename?: 'NewsRecord', id: any, title?: string | null, content?: string | null, slug?: string | null, intro?: string | null, createdAt: any, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string } }>, pagination: { __typename?: 'CollectionMetadata', count: any } };

type NewsQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


type NewsQuery = { __typename?: 'Query', news?: { __typename?: 'NewsRecord', id: any, title?: string | null, content?: string | null, slug?: string | null, intro?: string | null, createdAt: any, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, bgColor?: string | null, sizes: string } | null } | null, region: { __typename?: 'RegionRecord', id: any, name: string, slug: string } } | null };

type AllProjectsQueryVariables = Exact<{ [key: string]: never; }>;


type AllProjectsQuery = { __typename?: 'Query', projects: Array<{ __typename?: 'ProjectRecord', title?: string | null, url?: string | null, text?: string | null, image?: { __typename?: 'FileField', id: any, mimeType: string, url: string, title?: string | null, responsiveImage?: { __typename?: 'ResponsiveImage', src: string, width: any, height: any, alt?: string | null, base64?: string | null, bgColor?: string | null, sizes: string } | null } | null }> };

type ProjectsIntroQueryVariables = Exact<{ [key: string]: never; }>;


type ProjectsIntroQuery = { __typename?: 'Query', introInitiative?: { __typename?: 'IntroInitiativeRecord', intro: string } | null };

type StartQueryVariables = Exact<{ [key: string]: never; }>;


type StartQuery = { __typename?: 'Query', start?: { __typename?: 'StartRecord', headline?: string | null, intro?: string | null } | null };
