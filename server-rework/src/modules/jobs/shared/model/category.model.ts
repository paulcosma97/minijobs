import {GenericServerError} from '../../../../shared/utils/error';
import {Nullable} from '../../../../shared/utils/helper-types';

export enum CategoryType {
    ROOT = 'root',
    IT = 'it',
    GARDEN = 'garden',
    PETS = 'pets',
    HOUSE = 'house',
    HOMEWORK = 'homework'
}

export class Category {
    public readonly parent: Nullable<Category>;

    constructor(
        public readonly type: CategoryType, parent: Nullable<CategoryType>
    ) {
        this.parent = parent ? Category.getJobCategory(parent) : null;
    }

    get children(): Category[] {
        return CATEGORIES.filter(category => category.parent?.type == this.type);
    }

    get isLeaf(): boolean {
        return this.children.length === 0;
    }

    static getJobCategory(type: CategoryType): Category {
        const category = CATEGORIES.find(category => category.type === type);

        if (!category) {
            throw new GenericServerError(`Could not find category by type: ${type}.`)
        }

        return category;
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
];