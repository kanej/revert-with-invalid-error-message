import hre from "hardhat";

import assert from "node:assert";

describe("revert example", function () {
  it("should throw the right error message for a valid revert error message", async function () {
    try {
      const RevertExample = await hre.ethers.getContractFactory(
        "RevertExample"
      );

      const revertExampleContract = await RevertExample.deploy();

      await revertExampleContract.revertWithReasonMessage();
    } catch (error) {
      assert(error instanceof Error);
      assert.equal(
        error.message,
        "VM Exception while processing transaction: reverted with reason string 'reason'"
      );
    }
  });

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
});
