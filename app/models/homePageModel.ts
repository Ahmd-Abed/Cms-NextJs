export class homePageModel {
  id: string;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  locale: string;
  NavBar: NavbarItem[];
  carousel_collections: Carousel[];
  news_collections: News[];
  quick_links_collections: QuickLinks[];
  Footer: FooterItem[];
  Faq: Faq[];
  About: About[];
  constructor(homePageData: any) {
    this.id = homePageData.id;
    this.createdAt = new Date(homePageData.createdAt).getTime();
    this.updatedAt = new Date(homePageData.updatedAt).getTime();
    this.publishedAt = new Date(homePageData.publishedAt).getTime();
    this.locale = homePageData.locale;
    this.NavBar = this.mapNavBarItems(homePageData.NavBar ?? []);
    this.carousel_collections = this.mapCarouselItems(
      homePageData.carousel_collections ?? []
    );
    this.news_collections = this.mapNewsItems(
      homePageData.news_collections ?? []
    );
    this.quick_links_collections = this.mapQuickLinksItems(
      homePageData.quick_links_collections ?? []
    );
    this.About = this.mapAboutItems(homePageData.ContentHomePage ?? []);
    this.Faq = this.mapFaqItems(homePageData.ContentHomePage ?? []);
    this.Footer = this.mapFooterItems(homePageData.Footer ?? []);

    // Object.freeze(this); // Freeze the instance
  }

  private mapNavBarItems(data: any[]): NavbarItem[] {
    return data
      .map((item) => {
        if (item.__component === "navbar.nav-item") {
          return new NavbarItem(item);
        }
        return null;
      })
      .filter((item): item is NavbarItem => item !== null);
  }
  private mapFooterItems(data: any[]): FooterItem[] {
    return data
      .map((item) => {
        if (item.__component === "footer.footer-item") {
          return new FooterItem(item);
        }
        return null;
      })
      .filter((item): item is FooterItem => item !== null);
  }

  private mapCarouselItems(data: any[]): Carousel[] {
    return data.map((item) => new Carousel(item));
  }
  private mapNewsItems(data: any[]): News[] {
    return data.map((item) => new News(item));
  }
  private mapQuickLinksItems(data: any[]): QuickLinks[] {
    return data.map((collection) => new QuickLinks(collection));
  }
  private mapAboutItems(data: any[]): About[] {
    return data
      .filter((item) => item.__component === "about.about")
      .map((collection) => new About(collection));
  }
  private mapFaqItems(data: any[]): Faq[] {
    return data
      .filter((item) => item.__component === "faq.faq")
      .flatMap((item) => item.faq_collections || [])
      .map((collection) => new Faq(collection));
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        publishedAt: this.publishedAt,
        locale: this.locale,
        NavBar: this.NavBar.map((item) => item.toPlainObject()),
        carousel_collections: this.carousel_collections.map((item) =>
          item.toPlainObject()
        ),
        news_collections: this.news_collections.map((item) =>
          item.toPlainObject()
        ),
        quick_links: this.quick_links_collections.map((item) =>
          item.toPlainObject()
        ),
        About: this.About.map((item) => item.toPlainObject()),
        Faq: this.Faq.map((item) => item.toPlainObject()),
        Footer: this.Footer.map((item) => item.toPlainObject()),
      })
    );
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
    // Object.freeze(this);
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        label: this.label,
        link: this.link,
        isShown: this.isShown,
        subItems: this.subItems.map((subItem: any) => subItem.toPlainObject()),
      })
    );
  }
}

export class Carousel {
  id: number;
  title: string;
  description: string;
  link: string | null;
  linkLabel: string | null;
  isShown: boolean;
  image: ImageDataNew;

  constructor(carouselData: any) {
    this.id = carouselData.id;
    this.title = carouselData.Title;
    this.description = carouselData.Description;
    this.link = carouselData.Link;
    this.linkLabel = carouselData.LinkLabel;
    this.isShown = carouselData.IsShown;
    this.image = new ImageDataNew(carouselData.Image);
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        title: this.title,
        description: this.description,
        link: this.link,
        linkLabel: this.linkLabel,
        isShown: this.isShown,
        image: this.image.toPlainObject(),
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
export class About {
  id: number;
  Title: string;
  Link: string;
  Image: ImageDataNew;
  Description: string;
  constructor(aboutData: any) {
    this.id = aboutData.id;
    this.Title = aboutData.Title;
    this.Link = aboutData.Link;
    this.Description = aboutData.Description;
    this.Image = aboutData.Image;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        Title: this.Title,
        Link: this.Link,
        Description: this.Description,
        Image: this.Image,
      })
    );
  }
}

export class News {
  id: number;
  documentId: string;
  title: string;
  description: string;
  date: number;
  createdAt: number;
  updatedAt: number;
  publishedAt: number;
  locale: string;
  isShown: boolean;
  image: ImageDataNew[];

  constructor(newsData: any) {
    this.id = newsData.id;
    this.documentId = newsData.documentId;
    this.title = newsData.Title;
    this.description = newsData.Description;
    this.date = new Date(newsData.Date).getTime();
    this.createdAt = new Date(newsData.createdAt).getTime();
    this.updatedAt = new Date(newsData.updatedAt).getTime();
    this.publishedAt = new Date(newsData.publishedAt).getTime();
    this.locale = newsData.locale;
    this.isShown = newsData.IsShown;
    this.image = newsData.Image.map((img: any) => new ImageDataNew(img));
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        documentId: this.documentId,
        title: this.title,
        description: this.description,
        date: this.date,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        publishedAt: this.publishedAt,
        locale: this.locale,
        isShown: this.isShown,
        image: this.image.map((img) => img.toPlainObject()),
      })
    );
  }
}

export class QuickLinks {
  id: number;
  Label: string;
  Link: string;
  Logo: ImageDataNew;
  constructor(quickLinkData: any) {
    this.id = quickLinkData.id;
    this.Label = quickLinkData.Label;
    this.Link = quickLinkData.Link;
    this.Logo = quickLinkData.Logo;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        Label: this.Label,
        Link: this.Link,
        Logo: this.Logo,
      })
    );
  }
}
export class Faq {
  question: string;
  answer: string;
  isShown: boolean;

  constructor(faqData: any) {
    this.question = faqData.Question;
    this.answer = faqData.Answer;
    this.isShown = faqData.IsShown;
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        question: this.question,
        answer: this.answer,
        isShown: this.isShown,
      })
    );
  }
}
export class FooterItem {
  id: number;
  label: string;
  link: string;
  isShown: boolean;
  subItems: FooterItem[];

  constructor(footerData: any) {
    this.id = footerData.id;
    this.label = footerData.Label;
    this.link = footerData.Link;
    this.isShown = footerData.IsShown;
    this.subItems = footerData?.Footer
      ? footerData.Footer.map((subItem: any) => new FooterItem(subItem))
      : [];
    // Object.freeze(this);
  }

  toPlainObject() {
    return JSON.parse(
      JSON.stringify({
        id: this.id,
        label: this.label,
        link: this.link,
        isShown: this.isShown,
        subItems: this.subItems.map((subItem: any) => subItem.toPlainObject()),
      })
    );
  }
}
