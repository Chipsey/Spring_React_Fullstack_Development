package com.example.demo.Inventory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Long> {
    @Query("SELECT s FROM Inventory s WHERE s.name = ?1")
    Optional<Inventory> findInventoryByName(String name);
}
