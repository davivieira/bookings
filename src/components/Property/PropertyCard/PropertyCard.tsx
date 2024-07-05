import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Property } from '@/types';
import { SCCard, SCCardFooter, SCPrice } from './PropertyCard.styles';
import { BookingModalGroup } from '@/components/Booking/';

type PropertyCardProps = {
  property: Property,
}

function PropertyCard({ property }: PropertyCardProps) {
  return (
    <SCCard>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={property.picture}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {property.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {property.description}
        </Typography>
      </CardContent>
      <SCCardFooter>
        <BookingModalGroup propertyId={property.id} />
        <SCPrice>U$ {property.price},00</SCPrice>
      </SCCardFooter>
    </SCCard>
  );
}

export default PropertyCard;