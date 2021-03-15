       
            const contact = {
                firstName,
                lastName,
                address,
                city,
                email,
            };

            const body = {
                contact,
                products,
            };

            postData(
                "http://localhost:3000/api/teddies/order",
                body

            );
        }
    