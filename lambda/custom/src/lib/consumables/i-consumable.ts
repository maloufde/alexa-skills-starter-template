export interface IConsumable {
    productId: string;
    referenceName: string;
    type: string;
    name: string;
    summary: string;
    entitled: string;
    entitlementReason: string;
    purchasable: string;
    activeEntitlementCount: number;
    purchaseMode: string;
}