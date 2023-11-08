package com.example.demo.Order;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @SequenceGenerator(
            name = "order_sequence",
            sequenceName = "order_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "order_sequence"
    )
    private long id;
    private String customerEmail;
    private long productId;
    private String productName;
    private long unitPrice;
    private long totalPrice;
    private long quantity;
    private long oldQuantity;
    private String deliveryPerson;
    private String address;
    private long deliveryPersonId;
    private boolean isApproved;
    private boolean isPacked;
    private boolean isDeliveryStart;
    private boolean isDelivered;
    private boolean isCancelled;
    private Date orderDate;
    private Date approvalDate;
    private Date packedDate;
    private Date deliveryStartDate;
    private Date DeliveredDate;
    private boolean isDeliveryApproved;

}