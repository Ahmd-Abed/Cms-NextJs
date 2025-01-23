export class homePageModel {
  id: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  locale: string;
  ContentHomePage: (NavbarItem | Carousel | About | QuickLink)[];

  constructor(homePageData: any) {
    this.id = homePageData.data.id;
    this.createdAt = new Date(homePageData.data.createdAt).getTime();
    this.updatedAt = new Date(homePageData.data.updatedAt).getTime();
    this.publishedAt = new Date(homePageData.data.publishedAt).getTime();
    this.locale = homePageData.data.locale;
    this.ContentHomePage = this.mapContentHomePage(
      homePageData.data.ContentHomePage
    );
  }

  private mapContentHomePage(
    data: any[]
  ): (NavbarItem | Carousel | About | QuickLink)[] {
    return data
      .map((item) => {
        switch (item.__component) {
          case "navbar.nav-item":
            return new NavbarItem(item);
          case "carousel.carousel":
            return new Carousel(item);
          case "about.about":
            return new About(item);
          case "quick-links.quick-links":
            return new QuickLink(item);
          default:
            return null;
        }
      })
      .filter(
        (item): item is NavbarItem | Carousel | About | QuickLink =>
          item !== null
      );
  }

  getNavbarItems(): NavbarItem[] {
    return this.ContentHomePage.filter(
      (item) => item instanceof NavbarItem
    ) as NavbarItem[];
  }

  getCarousels(): Carousel[] {
    return this.ContentHomePage.filter(
      (item) => item instanceof Carousel
    ) as Carousel[];
  }

  getAbouts(): About[] {
    return this.ContentHomePage.filter(
      (item) => item instanceof About
    ) as About[];
  }

  getQuickLinks(): QuickLink[] {
    return this.ContentHomePage.filter(
      (item) => item instanceof QuickLink
    ) as QuickLink[];
  }

  toPlainObject() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publishedAt: this.publishedAt,
      locale: this.locale,
      ContentHomePage: this.ContentHomePage.map((item) => item.toPlainObject()),
    };
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
    return {
      id: this.id,
      documentId: this.documentId,
      name: this.name,
      url: this.url,
      width: this.width,
      height: this.height,
      formats: this.formats,
    };
  }
}

export class NavbarItem {
  id: number;
  label: string;
  link: string;
  isShown: boolean;
  subItems: NavbarItem[];

  constructor(navbarData: any) {
    this.id = navbarData.id;
    this.label = navbarData.Label;
    this.link = navbarData.Link;
    this.isShown = navbarData.IsShown;
    this.subItems = navbarData?.SubItem
      ? navbarData.SubItem.map((subItem: any) => new NavbarItem(subItem))
      : [];
  }

  toPlainObject() {
    return {
      id: this.id,
      label: this.label,
      link: this.link,
      isShown: this.isShown,
      subItems: this.subItems.map((subItem: any) => subItem.toPlainObject()),
    };
  }
}

class Carousel {
  id: number;
  title: string;
  description: string;
  link: string | null;
  labelButton: string | null;
  image: ImageDataNew;

  constructor(carouselData: any) {
    this.id = carouselData.id;
    this.title = carouselData.Title;
    this.description = carouselData.Description;
    this.link = carouselData.Link;
    this.labelButton = carouselData.LabelButton;
    this.image = new ImageDataNew(carouselData.Image);
  }

  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      link: this.link,
      labelButton: this.labelButton,
      image: this.image.toPlainObject(),
    };
  }
}

class About {
  id: number;
  title: string;
  description: string;
  image: ImageDataNew;

  constructor(aboutData: any) {
    this.id = aboutData.id;
    this.title = aboutData.Title;
    this.description = aboutData.Description;
    this.image = new ImageDataNew(aboutData.Image);
  }

  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      image: this.image.toPlainObject(),
    };
  }
}

class QuickLink {
  id: number;
  title: string;
  link: string;
  logo: ImageDataNew;

  constructor(quickLinkData: any) {
    this.id = quickLinkData.id;
    this.title = quickLinkData.Title;
    this.link = quickLinkData.Link;
    this.logo = new ImageDataNew(quickLinkData.Logo);
  }

  toPlainObject() {
    return {
      id: this.id,
      title: this.title,
      link: this.link,
      logo: this.logo.toPlainObject(),
    };
  }
}
