import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function ProductCard({ product }) {
  const handlePurchase = async () => {
    const userRef = doc(db, "users", "UqRDd4wrIVyB0Xm1hdTA");

    const userSnapshot = await getDoc(userRef);
    if (userSnapshot.exists) {
      const user = { ...userSnapshot.data(), id: userSnapshot.id };
      if(user.accountBalance <= product.price) {
        alert("Insufficient funds");
        return;
      }
      user.accountBalance = user.accountBalance - product.price;
      user.purchases = [...user.purchases, product];
      await updateDoc(userRef, user);

      alert("Purchase successful");
    }
  };

  return (
    <Card variant="outlined" sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Price: {product.price}
        </Typography>
        <Typography variant="body2">
          {product.quantityInStock > 0
            ? `Stock: ${product.quantityInStock}`
            : "Out of Stock"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handlePurchase}>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
}
