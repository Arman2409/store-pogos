import type { SearchClientsCriteria } from "../../types/search";

const updateClientsSearchCriteria = (name?: string, email?: string) => {
  const criteria: SearchClientsCriteria = {};
  if (name)
    criteria.name = {
      contains: name,
    };
  if (email)
    criteria.email = {
      contains: email,
    };
  return criteria;
};

export default updateClientsSearchCriteria;
