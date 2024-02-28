const updateSearchCriteria = (
    priceRange?: [number | null, number | null],
    name?: string,
    category?: string
) => {
    const criteria: any = {}
    
    if (priceRange) {
        const [minPrice, maxPrice] = priceRange;

        if (minPrice) {
            criteria.price = { ...(criteria.price || {}), gte: minPrice };
        }

        if (maxPrice) {
            criteria.price = { ...(criteria.price || {}), lte: maxPrice };
        }
    }
    if (name)  criteria.name = { contains: name }
    if (category)  criteria.category = category;
    return criteria;
}

export default updateSearchCriteria;