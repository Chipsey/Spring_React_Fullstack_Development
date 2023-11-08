package com.example.demo.Inventory;

import lombok.Data;

@Data
public class OrderRequest {
    private long quantity;
    private long oldQuantity;
    private long productId;
}
