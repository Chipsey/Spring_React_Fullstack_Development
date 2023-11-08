package com.example.demo.Inventory;

import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/inventory")
public class InventoryController {
    private final InventoryService inventoryService;

    @Autowired
    public InventoryController(InventoryService inventoryService) {
        this.inventoryService = inventoryService;
    }

    @GetMapping("/all")
    public List<Inventory> getInventory() {
        return inventoryService.getInventory();
    }

    @GetMapping("/fetch/{id}")
    public Optional<Inventory> getInventorybyId(@PathVariable Long id) {
        return inventoryService.getInventorybyId(id);
    }

    @PostMapping("/add")
    public void registerNewInventory(@RequestBody Inventory inventory) {
        inventoryService.addNewInventory(inventory);
    }

    @DeleteMapping("/delete/{inventoryId}")
    public void deleteInventory(@PathVariable("inventoryId") Long inventoryId) {
        inventoryService.deleteInventory(inventoryId);
    }

    @PutMapping("/update/{inventoryId}")
    public void updateInventory(@PathVariable("inventoryId") Long inventoryId,
                              @RequestBody Inventory inventory) {
        inventoryService.updateInventory(inventoryId, inventory.getName(), inventory.getPrice(), String.valueOf(inventory.getQuantity()), inventory.getImageUrls());
    }




    //Ordering Process

    @PostMapping("/add-new-order")
    public void addNewOrder(@RequestBody OrderRequest orderRequest) {
        inventoryService.addNewOrder(orderRequest);
    }

    @PostMapping("/update-order")
    public void updateOrder(@RequestBody OrderRequest orderRequest) {
        inventoryService.updateOrder(orderRequest);
    }
}
