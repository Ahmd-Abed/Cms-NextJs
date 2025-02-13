export class mediaPageModel {
  id: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  locale: string;
  Images: ImagesItem[];
  Videos: VideosItem[];
  Publications: PublicationsItem[];

  constructor(mediaPageData: any) {
    this.id = mediaPageData.id;
    this.createdAt = new Date(mediaPageData.createdAt).getTime();
    this.updatedAt = new Date(mediaPageData.updatedAt).getTime();
    this.publishedAt = new Date(mediaPageData.publishedAt).getTime();
    this.locale = mediaPageData.locale;
    this.Images = this.mapImagesItems(mediaPageData.Images.images ?? []);
    this.Videos = this.mapVideosItems(mediaPageData.Videos.videos ?? []);
    this.Publications = this.mapPublicationsItems(
      mediaPageData.Publications.publications ?? []
    );
  }

  private mapImagesItems(data: any[]): ImagesItem[] {
    return data.map((item) => new ImagesItem(item));
  }

  private mapVideosItems(data: any[]): VideosItem[] {
    return data.map((item) => new VideosItem(item));
  }

  private mapPublicationsItems(data: any[]): PublicationsItem[] {
    return data.map((item) => new PublicationsItem(item));
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        publishedAt: this.publishedAt,
        locale: this.locale,
        Images: this.Images.map((item) => item.toPlainObject()),
        Videos: this.Videos.map((item) => item.toPlainObject()),
        Publications: this.Publications.map((item) => item.toPlainObject()),
      })
    );
  }
}

export class ImagesItem {
  id: number;
  Title: string;
  Date: Date;
  Image: ImageDataNew;

  constructor(imagesData: any) {
    this.id = imagesData.id;
    this.Title = imagesData.Title;
    this.Date = imagesData.Date;
    this.Image = imagesData.Image;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        Title: this.Title,
        Date: this.Date,
        Image: this.Image,
      })
    );
  }
}
export class VideosItem {
  id: number;
  Title: string;
  Date: Date;
  Video: ImageDataNew;

  constructor(imagesData: any) {
    this.id = imagesData.id;
    this.Title = imagesData.Title;
    this.Date = imagesData.Date;
    this.Video = imagesData.Video;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        Title: this.Title,
        Date: this.Date,
        Video: this.Video,
      })
    );
  }
}
export class PublicationsItem {
  id: number;
  Title: string;
  Date: Date;
  File: ImageDataNew;

  constructor(imagesData: any) {
    this.id = imagesData.id;
    this.Title = imagesData.Title;
    this.Date = imagesData.Date;
    this.File = imagesData.File;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        title: this.Title,
        date: this.Date,
        file: this.File,
      })
    );
  }
}

class ImageDataNew {
  id: number;
  documentId: string;
  name: string;
  url: string;
  width: number;
  height: number;
  formats: {
    thumbnail: { url: string };
    small: { url: string };
    medium: { url: string };
    large: { url: string };
  };

  constructor(imageData: {
    id: number;
    documentId: string;
    name: string;
    url: string;
    width: number;
    height: number;
    formats: {
      thumbnail: { url: string };
      small: { url: string };
      medium: { url: string };
      large: { url: string };
    };
  }) {
    this.id = imageData.id;
    this.documentId = imageData.documentId;
    this.name = imageData.name;
    this.url = imageData.url;
    this.width = imageData.width;
    this.height = imageData.height;
    this.formats = imageData.formats;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        documentId: this.documentId,
        name: this.name,
        url: this.url,
        width: this.width,
        height: this.height,
        formats: this.formats,
      })
    );
  }
}
