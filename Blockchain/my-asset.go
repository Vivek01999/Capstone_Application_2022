/*
 * SPDX-License-Identifier: Apache-2.0
 */

package main

// MyAsset stores a value
type MyAsset struct {
	Value string `json:"value"`
}

type MBSEBaseModelDesc struct {
	AssetID           string                  `json:"AssetId"`
	AssetType         string                  `json:"AssetType"`
	MBSEBaseModelDesc MBSEBaseModelDescstruct `json:"MBSEBaseModelDesc"`
	CreatedDate       string                  `json:"CreatedDate"`
	LastModifyDate    string                  `json:"LastModifyDate"`
}

type MBSEBaseModelDescstruct struct {
	ModelName     string `json:"ModelName"`
	BaseModelDesc string `json:"BaseModelDesc"`
}

type MBSEVariantModelDesc struct {
	AssetID              string                     `json:"AssetId"`
	AssetType            string                     `json:"AssetType"`
	MBSEVariantModelDesc MBSEVariantModelDescStruct `json:"MBSEVariantModelDesc"`
	CreatedDate          string                     `json:"CreatedDate"`
	LastModifyDate       string                     `json:"LastModifyDate"`
}

type MBSEVariantModelDescStruct struct {
	ModelName        string `json:"ModelName"`
	VariantModelDesc string `json:"VariantModelDesc"`
}

type MBSEModel struct {
	AssetID        string          `json:"AssetId"`
	AssetType      string          `json:"AssetType"`
	MBSEModel      MBSEModelStruct `json:"MBSEModel"`
	CreatedDate    string          `json:"CreatedDate"`
	LastModifyDate string          `json:"LastModifyDate"`
	ModelVersion   VersionStruct   `json:"Version"`
}

type MBSEModelStruct struct {
	ModelDesc string `json:"ModelDesc"`
	ModelName string `json:"ModelName"`
}
type VersionStruct struct {
	Version    string `json:"Version"`
	Subversion string `json:"Subversion"`
	StartTime  string `json:"StartTime"`
	EndTime    string `json:"EndTime"`
}
