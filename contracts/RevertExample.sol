// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract RevertExample {
    function revertWithReasonMessage() public pure {
        revert("reason");
    }

    function revertWithInvalidErrorMessage() public pure {
        // This starts with the right signature and then
        // invalid data wrt the ABI encoding
        bytes memory x = hex"08c379a0123456";
        assembly {
            revert(add(x, 32), 7)
        }
    }
}
