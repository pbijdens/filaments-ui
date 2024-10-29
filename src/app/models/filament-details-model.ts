import { StorageboxDetailsModel } from "./storagebox-details-model";
import { StorageboxHeaderModel } from "./storagebox-header-model";

export interface FilamentDetailsModel {
    id: number;
    description: string;
    notes: string;
    brand: string;
    kind: string;
    weight: number;
    initialWeight: number;
    pricePerKG: number;
    firstAdded: string;
    lastUpdated: string;
    color1: string;
    color2: string;
    storageBoxID: number;
    storageBoxName: string;
    photo: string;

    storagebox?: StorageboxHeaderModel;
} 