import {bool} from "aws-sdk/clients/signer";

export enum CategoryType {
    ROOT = 'root',
    IT = 'it',
    GARDEN = 'garden',
    PETS = 'pets',
    HOUSE = 'house',
    HOMEWORK = 'homework'
}

export class Category {
    public readonly parent: Category;

    constructor(
        public readonly type: CategoryType, parent: CategoryType
    ) {
        this.parent = Category.getJobCategory(parent);
    }

    get children(): Category[] {
        return CATEGORIES.filter(category => category.parent?.type == this.type);
    }

    get isLeaf(): boolean {
        return this.children.length === 0;
    }

    static getJobCategory(type: CategoryType): Category {
        return CATEGORIES.find(category => category.type === type);
    }
}

const CATEGORIES: Category[] = [
    // LEVEL 0
    new Category(CategoryType.ROOT, null),

    // LEVEL 1
    new Category(CategoryType.IT, CategoryType.ROOT),
    new Category(CategoryType.GARDEN, CategoryType.ROOT),
    new Category(CategoryType.PETS, CategoryType.ROOT),
    new Category(CategoryType.HOUSE, CategoryType.ROOT),
    new Category(CategoryType.HOMEWORK, CategoryType.ROOT),
]