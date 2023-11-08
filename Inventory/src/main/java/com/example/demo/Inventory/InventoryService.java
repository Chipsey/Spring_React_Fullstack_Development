package com.example.demo.Inventory;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InventoryService {

    private final InventoryRepository inventoryRepository;

    @Autowired
    public InventoryService(InventoryRepository inventoryRepository) {
        this.inventoryRepository = inventoryRepository;
    }

    public List<Inventory> getInventory() {
        return inventoryRepository.findAll();
    }

    public Optional<Inventory> getInventorybyId(Long id) {
        return inventoryRepository.findById(id);
    }


    public void addNewInventory(Inventory inventory) {
        Optional<Inventory> inventoryOptional = inventoryRepository
                .findInventoryByName(inventory.getName());
        if(inventoryOptional.isPresent()) {
            throw new IllegalStateException("Name is Already Taken!");
        }
        inventoryRepository.save(inventory);
    }

    public void deleteInventory(Long inventoryId) {
        Boolean exists = inventoryRepository.existsById(inventoryId);
        if(!exists) {
            throw new IllegalStateException("Inventory with id: " + inventoryId + " does not exist");
        }
        inventoryRepository.deleteById(inventoryId);
    }

    @Transactional
    public void updateInventory(Long inventoryId, String inventoryName, double price, String quantity, List<String> imageUrls) {
        Inventory inventory = inventoryRepository.findById(inventoryId)
                .orElseThrow(() -> new IllegalStateException("Inventory with id: " + inventoryId + " does not exist"));

        if (inventoryName != null && !inventoryName.isEmpty() && !Objects.equals(inventory.getName(), inventoryName)) {
            // Check if the updated name is already in use
            Optional<Inventory> inventoryWithSameName = inventoryRepository.findInventoryByName(inventoryName);
            if (inventoryWithSameName.isPresent()) {
                throw new IllegalArgumentException("Name is already in use!");
            }
            inventory.setName(inventoryName);
        }

        if (price > 0.00 && !Objects.equals(inventory.getPrice(), price)) {
            inventory.setPrice((long) price);
        }

        if (quantity != null && !quantity.isEmpty()) {
            // Convert the quantity to a long
            long newQuantity = Long.parseLong(quantity);
            if (newQuantity > 0 && !Objects.equals(inventory.getQuantity(), newQuantity)) {
                inventory.setQuantity(newQuantity);
            }
        }
        inventory.setImageUrls(imageUrls);
    }


    //Order Process

    @Transactional
    public void addNewOrder(OrderRequest orderRequest) {
        Inventory inventory = inventoryRepository.findById(orderRequest.getProductId())
                .orElseThrow(() -> new IllegalStateException("Inventory with id: " + orderRequest.getProductId() + " does not exist"));

        long newQuantity = inventory.getQuantity() - orderRequest.getQuantity();
        System.out.println(newQuantity);

        inventory.setQuantity(newQuantity);
    }

    @Transactional
    public void updateOrder(OrderRequest orderRequest) {
        Inventory inventory = inventoryRepository.findById(orderRequest.getProductId())
                .orElseThrow(() -> new IllegalStateException("Inventory with id: " + orderRequest.getProductId() + " does not exist"));

        long newQuantity = inventory.getQuantity() + orderRequest.getOldQuantity() - orderRequest.getQuantity();
        inventory.setQuantity(newQuantity);
    }
}
