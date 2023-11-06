package com.example.demo.Order;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderbyId(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getOrdersByCustomerEmail(String email) {
        return orderRepository.findByCustomerEmail(email);
    }


    public void addNewOrder(Order order) {
        orderRepository.save(order);
//        System.out.println(order);
    }

    public void deleteOrder(Long id) {
        Boolean exists = orderRepository.existsById(id);
        if(!exists) {
            throw new IllegalStateException("Order with id: " + id + " does not exist");
        }
        orderRepository.deleteById(id);
    }

//    @Transactional
//    public void updateOrder(Long inventoryId, String inventoryName, double price, String quantity, List<String> imageUrls) {
//        Inventory inventory = inventoryRepository.findById(inventoryId)
//                .orElseThrow(() -> new IllegalStateException("Inventory with id: " + inventoryId + " does not exist"));
//
//        if (inventoryName != null && !inventoryName.isEmpty() && !Objects.equals(inventory.getName(), inventoryName)) {
//            // Check if the updated name is already in use
//            Optional<Inventory> inventoryWithSameName = inventoryRepository.findInventoryByName(inventoryName);
//            if (inventoryWithSameName.isPresent()) {
//                throw new IllegalArgumentException("Name is already in use!");
//            }
//            inventory.setName(inventoryName);
//        }
//
//        if (price > 0.00 && !Objects.equals(inventory.getPrice(), price)) {
//            inventory.setPrice((long) price);
//        }
//
//        if (quantity != null && !quantity.isEmpty()) {
//            // Convert the quantity to a long
//            long newQuantity = Long.parseLong(quantity);
//            if (newQuantity > 0 && !Objects.equals(inventory.getQuantity(), newQuantity)) {
//                inventory.setQuantity(newQuantity);
//            }
//        }
//        inventory.setImageUrls(imageUrls);
//    }
}
