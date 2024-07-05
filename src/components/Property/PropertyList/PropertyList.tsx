import PropertyCard from "../PropertyCard/PropertyCard";
import { useSearchParams } from "@/utils";
import { Property } from "@/types";
import { SCResultsContainer } from "./PropertyList.styles";
import { useAvailableProperties } from "@/hooks";
import { MessagePage } from "@/shared/";

function PropertyList() {
  const params = useSearchParams();
  const checkinDate = params.get("checkinDate");
  const checkoutDate = params.get("checkoutDate");
  const { availableProperties } = useAvailableProperties(
    checkinDate,
    checkoutDate
  );

  return (
    <SCResultsContainer>
      {availableProperties && availableProperties.length ? (
        availableProperties.map((property: Property) => (
          <PropertyCard key={property.id} property={property} />
        ))
      ) : (
        <MessagePage>No properties available</MessagePage>
      )}
    </SCResultsContainer>
  );
}

export default PropertyList;
