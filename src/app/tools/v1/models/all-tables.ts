import { ArticleCategories } from './articlecategories';
import { Articles } from './articles';
import { Categories } from './categories';
import { Customers } from './customers';
import { Discounts_ApplyTo } from './discounts_applyto';
import { Discounts } from './discounts';
import { GiftCardDetails } from './giftcarddetails';
import { GiftCards } from './giftcards';
import { KitLinks } from './kitlinks';
import { Kits } from './kits';
import { OptionCategories } from './optioncategories';
import { Options } from './options';
import { PageText } from './pagetext';
import { Po_Items } from './po_items';
import { Pos } from './pos';
import { Product_Keys } from './product_keys';
import { Products } from './products';
import { Recurring } from './recurring';
import { Reviews } from './reviews';
import { ReviewsHelpful } from './reviewshelpful';
import { Rma_Items } from './rma_items';
import { Rmas } from './rmas';
import { States_Provinces } from './states_provinces';
import { Tax } from './tax';
import { TrackingNumbers } from './trackingnumbers';
import { VendorRules } from './vendorrules';
import { Vendors } from './vendors';

export class FieldDef {
    constructor(
        public type:string,
        public required?:boolean,
        public maxLength?:number,
        public pattern?:string,
        public patternMessage?:string,
        public enumvals?:string[],
        public items?:string
    ){}
}

export const AllTableDefs = {
    "articlecategories": ArticleCategories,
    "articles":Articles,
    "categories": Categories,
    "customers": Customers,
    "discounts_applyto": Discounts_ApplyTo,
    "discounts":Discounts,
    "giftcarddetails":GiftCardDetails,
    "giftcards":GiftCards,
    "kitlinks": KitLinks,
    "kits":Kits,
    "optioncategories":OptionCategories,
    "options":Options,
    "pagetext":PageText,
    "po_items":Po_Items,
    "pos":Pos,
    "product_keys":Product_Keys,
    "products":Products,
    "recurring":Recurring,
    "reviews":Reviews,
    "reviewshelpful":ReviewsHelpful,
    "rma_items":Rma_Items,
    "rmas":Rmas,
    "states_provinces":States_Provinces,
    "tax":Tax,
    "trackingnumbers":TrackingNumbers,
    "vendorrules":VendorRules,
    "vendors":Vendors
}