/*
 * Erascan - erasure protocol explorer
 * https://github.com/MikaelLazarev/erascan
 *
 * Copyright (c) 2019. Mikael Lazarev
 */
package accounts

import (
	"context"
	"github.com/MikaelLazarev/erascan/server/core"
	"github.com/gin-gonic/gin"
	"net/http"
)

func RetrieveBatchHandler(c *gin.Context) {

	accountID, ok := c.Params.Get("id")
	if !ok {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"message": "Wrong parameter"})
		return
	}

	accountDetails, err := accountService.Retrieve(context.TODO(), core.ID(accountID))
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, accountDetails)

}
