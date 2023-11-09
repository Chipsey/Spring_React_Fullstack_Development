package com.example.demo.Order;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @Query("SELECT o FROM Order o WHERE o.customerEmail LIKE ?1 ORDER BY o.id DESC")
    List<Order> findByCustomerEmail(String customerEmail);

    @Query("SELECT o FROM Order o ORDER BY o.id DESC")
    List<Order> fetchAllOrders();

    @Query("SELECT o FROM Order o WHERE o.isPacked = true AND o.isDeliveryStart = false ORDER BY o.id DESC")
    List<Order> fetchOpenOrders();

    @Query("SELECT o FROM Order o WHERE o.deliveryPersonId = ?1 ORDER BY o.id DESC")
    List<Order> findAllByDeliverId(Long id);
}