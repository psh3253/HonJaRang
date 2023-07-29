package com.example.honjarang.domain.jointdelivery.controller;

import com.example.honjarang.domain.jointdelivery.dto.*;
import com.example.honjarang.domain.jointdelivery.service.JointDeliveryService;
import com.example.honjarang.domain.user.entity.User;
import com.example.honjarang.security.CurrentUser;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/joint-deliveries")
public class JointDeliveryController {
    private final JointDeliveryService jointDeliveryService;

    @GetMapping("/stores")
    public ResponseEntity<List<StoreListDto>> getStoreList(String keyword) {
        List<StoreListDto> storeListDtoList = jointDeliveryService.getStoreListByApi(keyword);
        return ResponseEntity.ok(storeListDtoList);
    }

    @GetMapping("{jointDeliveryId}/menus")
    public ResponseEntity<List<MenuListDto>> getMenuList(@PathVariable Long jointDeliveryId) {
        List<MenuListDto> menuListDtoList = jointDeliveryService.getMenuList(jointDeliveryId);
        return ResponseEntity.ok(menuListDtoList);
    }

    @PostMapping("")
    public ResponseEntity<Void> createJointDelivery(@RequestBody JointDeliveryCreateDto dto, @CurrentUser User user) {
        jointDeliveryService.createJointDelivery(dto, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{jointDeliveryId}")
    public ResponseEntity<Void> cancelJointDelivery(@PathVariable Long jointDeliveryId, @CurrentUser User user) {
        jointDeliveryService.cancelJointDelivery(jointDeliveryId, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("")
    public ResponseEntity<List<JointDeliveryListDto>> getJointDeliveryList(@RequestParam Integer page, @RequestParam Integer size) {
        List<JointDeliveryListDto> jointDeliveryList = jointDeliveryService.getJointDeliveryList(page, size);
        return ResponseEntity.ok(jointDeliveryList);
    }

    @GetMapping("/{jointDeliveryId}")
    public ResponseEntity<JointDeliveryDto> getJointDelivery(@PathVariable Long jointDeliveryId) {
        JointDeliveryDto jointDelivery = jointDeliveryService.getJointDelivery(jointDeliveryId);
        return ResponseEntity.ok(jointDelivery);
    }

    @GetMapping("/{jointDeliveryId}/carts")
    public ResponseEntity<List<JointDeliveryCartListDto>> getJointDeliveryCartList(@PathVariable Long jointDeliveryId, @CurrentUser User user) {
        List<JointDeliveryCartListDto> jointDeliveryCartList = jointDeliveryService.getJointDeliveryCartList(jointDeliveryId, user);
        return ResponseEntity.ok(jointDeliveryCartList);
    }

    @PostMapping("/{jointDeliveryId}/carts")
    public ResponseEntity<Void> addJointDeliveryCart(@PathVariable Long jointDeliveryId, @RequestBody JointDeliveryCartCreateDto dto, @CurrentUser User user) {
        jointDeliveryService.addJointDeliveryCart(dto, user);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{jointDeliveryId}/carts/{jointDeliveryCartId}")
    public ResponseEntity<Void> removeJointDeliveryCart(@PathVariable Long jointDeliveryId, @PathVariable Long jointDeliveryCartId, @CurrentUser User user) {
        jointDeliveryService.removeJointDeliveryCart(jointDeliveryCartId, user);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{jointDeliveryId}/receive")
    public ResponseEntity<Void> confirmReceipt(@PathVariable Long jointDeliveryId, @CurrentUser User user) {
        jointDeliveryService.confirmReceived(jointDeliveryId, user);
        return ResponseEntity.ok().build();
    }
}
