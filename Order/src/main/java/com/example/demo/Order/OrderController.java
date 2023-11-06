package com.example.demo.Order;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/order")
public class OrderController {
    private final OrderService orderService;
    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/all")
    public List<Order> getOrders() {
        return orderService.getOrders();
    }

    @GetMapping("/fetch/{id}")
    public Optional<Order> getOrderbyId(@PathVariable Long id) {
        return orderService.getOrderbyId(id);
    }


    @GetMapping("/fetch-by-cid/{email}")
    public List<Order> getOrdersByCustomerEmail(@PathVariable String email) {
        return orderService.getOrdersByCustomerEmail(email);
    }

    @PostMapping("/add")
    public void addNewOrder(@RequestBody Order order) {
        try {
            String inventoryUrl = "http://localhost:8081/api/v1/inventory/add-new-order";
            restTemplate.postForEntity(inventoryUrl, order, Long.class);
        } catch (RestClientException e) {
            System.out.println("RestClientException: " + e.toString());
            return;
        } catch (Exception e) {
            System.out.println("Exception: " + e.toString());
            return;
        }
        orderService.addNewOrder(order);
    }

    @DeleteMapping("/delete/{orderId}")
    public void deleteOrder(@PathVariable("orderId") Long orderId) {
        orderService.deleteOrder(orderId);
    }

//    @PutMapping("/update/{inventoryId}")
//    public void updateInventory(@PathVariable("inventoryId") Long inventoryId,
//                              @RequestBody Inventory inventory) {
//        inventoryService.updateInventory(inventoryId, inventory.getName(), inventory.getPrice(), String.valueOf(inventory.getQuantity()), inventory.getImageUrls());
//    }
}