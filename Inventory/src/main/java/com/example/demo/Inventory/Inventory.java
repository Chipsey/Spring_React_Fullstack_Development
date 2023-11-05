package com.example.demo.Inventory;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@Table
@NoArgsConstructor
@AllArgsConstructor
public class Inventory {
    @Id
    @SequenceGenerator(
            name = "inventory_sequence",
            sequenceName = "inventory_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "inventory_sequence"
    )
    private long id;
    private String name;
    private String description;
    private long price;
    private long quantity;

    @ElementCollection
    @CollectionTable(name = "image_urls", joinColumns = @JoinColumn(name = "inventory_id"))
    @Column(name = "url")
    private List<String> imageUrls;
}