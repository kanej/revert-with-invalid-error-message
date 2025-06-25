# Revert example

This is a reproduction repo for a changed error message from EDR:

```shell
npm install
npx hardhat test
```

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
