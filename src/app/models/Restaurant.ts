import { Menu } from "./Menu";

export interface Restaurant {
    id: string,
    name: string,
    address: string,
    cuisines: string,
    rating: string,
    reviews: string,
    feature_image: string,
    thumbnail_image: string,
    menu: Menu[]
}