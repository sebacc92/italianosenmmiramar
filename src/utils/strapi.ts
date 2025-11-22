

export const BASE_URL = import.meta.env.VITE_STRAPI_URL;

export interface StrapiEvento {
    id: number;
    documentId: string;
    titulo: string;
    fecha: string;
    lugar: string;
    destacado: boolean;
    description: string;
    imagen:
    | {
        url: string;
        formats?: {
            thumbnail?: { url: string; width?: number; height?: number };
            small?: { url: string; width?: number; height?: number };
            medium?: { url: string; width?: number; height?: number };
            large?: { url: string; width?: number; height?: number };
        };
        width?: number;
        height?: number;
        alternativeText?: string | null;
    }
    | null;
    galeria?:
    | Array<{
        url: string;
        formats?: {
            thumbnail?: { url: string; width?: number; height?: number };
            small?: { url: string; width?: number; height?: number };
            medium?: { url: string; width?: number; height?: number };
            large?: { url: string; width?: number; height?: number };
        };
    }>
    | null;
}

export interface EventoFormateado {
    id: string;
    title: string;
    date: string;
    dateObj: Date;
    description: string;
    location: string;
    image: string | null;
    imageLarge: string | null;
    imageAlt: string | null;
    imageSrcSet: string | null;
    imageWidth: number | null;
    imageHeight: number | null;
    imageThumb: string | null;
    destacado: boolean;
    galeria?: Array<{ url: string }>;
}

export function formatDate(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    const diasSemana = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
    ];
    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    const diaSemana = diasSemana[fecha.getDay()];
    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const hora = fecha.getHours();
    const minutos = fecha.getMinutes();

    let dateStr = `${diaSemana} ${dia} de ${mes}`;
    if (hora > 0 || minutos > 0) {
        const horaStr = hora.toString().padStart(2, "0");
        const minutosStr = minutos.toString().padStart(2, "0");
        dateStr += ` - ${horaStr}:${minutosStr}hs`;
    }

    return dateStr;
}

export function absolutize(url: string): string {
    const baseUrl = BASE_URL.replace(/\/$/, "");
    return url.startsWith("http") ? url : `${baseUrl}${url}`;
}

export function getStrapiImageUrl(
    imagen: StrapiEvento["imagen"],
    size:
        | "thumbnail"
        | "small"
        | "medium"
        | "large"
        | "original" = "medium"
): string | null {
    if (!imagen) return null;

    const imageUrl = absolutize(imagen.url);

    if (size !== "original" && imagen.formats && imagen.formats[size]) {
        const format = imagen.formats[size];
        if (format) {
            return absolutize(format.url);
        }
    }

    return imageUrl;
}

export function getStrapiImageSrcSet(
    imagen: StrapiEvento["imagen"]
): string | null {
    if (!imagen) return null;

    const srcset: string[] = [];

    const pushIf = (
        fmt?: { url: string; width?: number },
        fallbackW?: number
    ) => {
        if (!fmt) return;
        const url = absolutize(fmt.url);
        const width = fmt.width || fallbackW;
        if (url && width) srcset.push(`${url} ${width}w`);
    };

    if (imagen.formats) {
        pushIf(imagen.formats.thumbnail, 156);
        pushIf(imagen.formats.small, 500);
        pushIf(imagen.formats.medium, 750);
        pushIf(imagen.formats.large, 1000);
    }

    const originalUrl = absolutize(imagen.url);
    if (imagen.width) {
        srcset.push(`${originalUrl} ${imagen.width}w`);
    } else if (imagen.formats?.large?.width) {
        const largeWidth = imagen.formats.large.width;
        srcset.push(`${originalUrl} ${Math.round(largeWidth * 1.5)}w`);
    } else {
        srcset.push(`${originalUrl} 1920w`);
    }

    return srcset.length > 0 ? srcset.join(", ") : null;
}
