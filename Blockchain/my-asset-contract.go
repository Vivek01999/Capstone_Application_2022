/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// MyAssetContract contract for managing CRUD for MyAsset
type MyAssetContract struct {
	contractapi.Contract
}

// MyAssetExists returns true when asset with given ID exists in world state
func (c *MyAssetContract) MyAssetExists(ctx contractapi.TransactionContextInterface, myAssetID string) (bool, error) {
	data, err := ctx.GetStub().GetState(myAssetID)

	if err != nil {
		return false, err
	}

	return data != nil, nil
}

// CreateMyAsset creates a new instance of MyAsset
func (c *MyAssetContract) CreateMBMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string, value string) error {
	// Additional Parameters - AssetID string, AssetType string, MBMDID string, ModelName string, BaseModelVersion string, BaseModelDesc string, Comment string

	exists, err := c.MyAssetExists(ctx, myAssetID)

	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("The asset %s already exists", myAssetID)
	}

	// myAsset := new(MyAsset)
	// myAsset.Value = value

	myAsset := new(MBSEBaseModelDesc)

	err = json.Unmarshal([]byte(value), myAsset)

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

func (c *MyAssetContract) CreateMVMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string, value string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)
	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("The asset %s already exists", myAssetID)
	}

	myAsset := new(MBSEVariantModelDesc)
	// myAsset.Value = value

	err = json.Unmarshal([]byte(value), myAsset)

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

func (c *MyAssetContract) CreateMMAsset(ctx contractapi.TransactionContextInterface, myAssetID string, value string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)

	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if exists {
		return fmt.Errorf("The asset %s already exists", myAssetID)
	}

	myAsset := new(MBSEModel)
	// myAsset.Value = value

	err = json.Unmarshal([]byte(value), myAsset)

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

// ReadMyAsset retrieves an instance of MyAsset from the world state
func (c *MyAssetContract) ReadMBMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string) (*MBSEBaseModelDesc, error) {

	bytes, err := ctx.GetStub().GetState(myAssetID)

	if err != nil {
		return nil, fmt.Errorf("Could not read from world state. %s", err)
	} else if bytes == nil {
		return nil, fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	var myAsset MBSEBaseModelDesc

	err = json.Unmarshal(bytes, &myAsset)

	if err != nil {
		return nil, fmt.Errorf("Could not unmarshal world state data to type MyAsset")
	}

	return &myAsset, nil
}

// ReadMyAsset retrieves an instance of MyAsset from the world state
func (c *MyAssetContract) ReadMVMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string) (*MBSEVariantModelDesc, error) {

	bytes, err := ctx.GetStub().GetState(myAssetID)

	if err != nil {
		return nil, fmt.Errorf("Could not read from world state. %s", err)
	} else if bytes == nil {
		return nil, fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	var myAsset MBSEVariantModelDesc

	err = json.Unmarshal(bytes, &myAsset)

	if err != nil {
		return nil, fmt.Errorf("Could not unmarshal world state data to type MyAsset")
	}

	return &myAsset, nil
}

// ReadMyAsset retrieves an instance of MyAsset from the world state
func (c *MyAssetContract) ReadMMAsset(ctx contractapi.TransactionContextInterface, myAssetID string) (*MBSEModel, error) {

	bytes, err := ctx.GetStub().GetState(myAssetID)

	if err != nil {
		return nil, fmt.Errorf("Could not read from world state. %s", err)
	} else if bytes == nil {
		return nil, fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	var myAsset MBSEModel

	err = json.Unmarshal(bytes, &myAsset)

	if err != nil {
		return nil, fmt.Errorf("Could not unmarshal world state data to type MyAsset")
	}

	return &myAsset, nil
}

// UpdateMyAsset retrieves an instance of MyAsset from the world state and updates its value
func (c *MyAssetContract) UpdateMBMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string, newValue string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)
	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	myAsset := new(MBSEBaseModelDesc)
	// myAsset.Value = newValue

	err = json.Unmarshal([]byte(newValue), myAsset)

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

func (c *MyAssetContract) UpdateMVMDAsset(ctx contractapi.TransactionContextInterface, myAssetID string, newValue string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)
	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	myAsset := new(MBSEVariantModelDesc)
	// myAsset.Value = newValue
	err = json.Unmarshal([]byte(newValue), myAsset)

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

func (c *MyAssetContract) UpdateMMAsset(ctx contractapi.TransactionContextInterface, myAssetID string, newValue string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)
	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	myAsset := new(MBSEModel)
	// myAsset.Value = newValue

	bytes, _ := json.Marshal(myAsset)

	return ctx.GetStub().PutState(myAssetID, bytes)
}

// DeleteMyAsset deletes an instance of MyAsset from the world state
func (c *MyAssetContract) DeleteMyAsset(ctx contractapi.TransactionContextInterface, myAssetID string) error {
	exists, err := c.MyAssetExists(ctx, myAssetID)
	if err != nil {
		return fmt.Errorf("Could not read from world state. %s", err)
	} else if !exists {
		return fmt.Errorf("The asset %s does not exist", myAssetID)
	}

	return ctx.GetStub().DelState(myAssetID)
}
