declare module 'imagesloaded' {
    interface ImagesLoadedOptions {
        background?: boolean;
    }

    interface ImagesLoaded {
        on(event: string, callback: (instance: ImagesLoaded) => void): this;
        off(event: string, callback: (instance: ImagesLoaded) => void): this;
    }

    function imagesLoaded(
        elem: Element | HTMLElement | NodeList | Array<Element> | string,
        options?: ImagesLoadedOptions,
        callback?: (instance: ImagesLoaded) => void
    ): ImagesLoaded;

    export = imagesLoaded;
}