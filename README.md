# Revert example

This is a reproduction repo for a changed error message from EDR:

## Usage to reproduce

```shell
npm install
npx hardhat test
```

Given the following contract:
```solidity
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
```

And the following test:

```ts
  it("should throw the right error message for an invalid revert error message", async function () {
    try {
      const RevertExample = await hre.ethers.getContractFactory(
        "RevertExample"
      );

      const revertExampleContract = await RevertExample.deploy();

      await revertExampleContract.revertWithInvalidErrorMessage();
    } catch (error) {
      assert(error instanceof Error);
      assert.equal(
        error.message,
        "VM Exception while processing transaction: reverted with reason string ''"
      );
    }
  });
```

Then invoking the tests will yield the following output:

```
  revert example
    ✔ should throw the right error message for a valid revert error message (375ms)
    1) should throw the right error message for an invalid revert error message


  1 passing (385ms)
  1 failing

  1) revert example
       should throw the right error message for an invalid revert error message:

      AssertionError [ERR_ASSERTION]: 'Expected return data to be a Error(string) and contain a valid string' == "VM Exception while processing transaction: reverted with reason string ''"
      + expected - actual

      -Expected return data to be a Error(string) and contain a valid string
      +VM Exception while processing transaction: reverted with reason string ''
      
      at RevertExample.revertWithInvalidErrorMessage (contracts/RevertExample.sol:14)


```
