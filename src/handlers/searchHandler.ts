import type { Request, Response } from "express";

import handleErrorResponse from "../helpers/handleErrorResponse";
import updateProductsSearchCriteria from "./utils/updateProductsSearchCriteria";
import updateClientsSearchCriteria from "./utils/updateClientsSearchCriteria";
import { searchClients, searchProducts } from "../db/searchDb";
import type { SearchClientsBody, SearchProductsBody } from "../types/search";

export const searchProductsHandler = async (
  { body }: Request,
  res: Response
) => {
  const { priceRange, name, category }: SearchProductsBody = { ...body };
  try {
    if (!name && !category && !priceRange) {
      return handleErrorResponse(res, "Please provide search details");
    }
    const criteria = updateProductsSearchCriteria(priceRange, name, category);
    const products = await searchProducts(criteria);
    //If no results for the given parameters, send an empty array instead of undefined.
    res.status(200).json(products || []);
  } catch (err) {
    handleErrorResponse(res, (err as Error)?.message);
  }
};

export const searchClientsHandler = async (
  { body }: Request,
  res: Response
) => {
  const { name, email }: SearchClientsBody = { ...body };
  try {
    if (!name && !email) {
      return handleErrorResponse(res, "Please provide name or email");
    }
    const criteria = updateClientsSearchCriteria(name, email);
    const clients = await searchClients(criteria);
    // If no results for the given parameters, send an empty array instead of undefined.
    res.status(200).json(clients || []);
  } catch (err) {
    handleErrorResponse(res, (err as Error)?.message);
  }
};
