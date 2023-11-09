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

    @GetMapping("/open")
    public List<Order> getOpenOrders() {
        return orderService.getOpenOrders();
    }

    @GetMapping("/fetch/{id}")
    public Optional<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }


    @GetMapping("/fetch-by-email/{customerEmail}")
    public List<Order> getOrdersByCustomerEmail(@PathVariable String customerEmail) {
        return orderService.getOrdersByCustomerEmail(customerEmail);
    }

    @GetMapping("/fetch-by-deliver-id/{deliverId}")
    public List<Order> getOrdersByDeliverId(@PathVariable Long deliverId) {
        return orderService.getOrdersByDeliverId(deliverId);
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

    @PutMapping("/update/{orderId}")
    public void updateOrder(@PathVariable("orderId") Long orderId,
                              @RequestBody Order order) {
        try {
            String inventoryUrl = "http://localhost:8081/api/v1/inventory/update-order";
            restTemplate.postForEntity(inventoryUrl, order, Long.class);
        } catch (RestClientException e) {
            System.out.println("RestClientException: " + e.toString());
            return;
        } catch (Exception e) {
            System.out.println("Exception: " + e.toString());
            return;
        }
        orderService.updateOrder(orderId, order);
    }
}
