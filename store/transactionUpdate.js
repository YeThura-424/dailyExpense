export const transactionUpdate = defineStore("transaction-update", () => {

  const updateTransaction = async (payload, id) => {
    const { categoryId, walletId, description, amount, type, action_date } =
      payload;
    const userId = authUser.value.id;

    try {
      // Retrieve old transaction data
      const { data: transactionData, error: transactionError } = await supabase
        .from("transactions")
        .select("*, categories(id, name), wallet(id, name, amount)")
        .eq("id", id)
        .single();

      if (transactionError) throw new Error(transactionError.message);

      // Update transaction details
      await updateTransactionDetails(id, {
        categoryId,
        walletId,
        userId,
        description,
        amount,
        type,
        action_date,
      });

      // Handle wallet update
      await updateWallet(
        transactionData,
        walletId,
        amount,
        type,
        id,
        action_date,
        userId
      );

      // Handle budget update if it's an expense
      if (type === "expense") {
        await updateBudget(transactionData, categoryId, amount, userId);
      }

      return { success: true, message: "Transaction updated successfully." };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Helper function to update transaction details
  const updateTransactionDetails = async (
    id,
    { categoryId, walletId, userId, description, amount, type, action_date }
  ) => {
    const { error } = await supabase
      .from("transactions")
      .update({
        category_id: categoryId,
        wallet_id: walletId,
        user_id: userId,
        description,
        amount,
        type,
        action_date,
      })
      .eq("id", id);

    if (error) throw new Error(error.message);
  };

  // Helper function to update wallet balances and log transactions
  const updateWallet = async (
    transactionData,
    newWalletId,
    newAmount,
    type,
    transactionId,
    action_date,
    userId
  ) => {
    const oldWalletId = transactionData.wallet.id;
    const oldWalletAmount = parseInt(transactionData.wallet.amount);
    const oldTransactionAmount = parseInt(transactionData.amount);
    const newTransactionAmount = parseInt(newAmount);

    if (oldWalletId === newWalletId) {
      // Update the same wallet balance
      const amountDifference = oldTransactionAmount - newTransactionAmount;
      await updateWalletBalance(
        newWalletId,
        oldWalletAmount + amountDifference
      );
    } else {
      // Restore old wallet amount
      const restoredAmount =
        type === "income"
          ? oldWalletAmount - oldTransactionAmount
          : oldWalletAmount + oldTransactionAmount;
      await updateWalletBalance(oldWalletId, restoredAmount);

      // Update new wallet balance
      const { data: newWalletData, error: newWalletError } = await supabase
        .from("wallet")
        .select("amount")
        .eq("id", newWalletId)
        .single();

      if (newWalletError) throw new Error(newWalletError.message);

      const updatedNewWalletAmount =
        type === "income"
          ? parseInt(newWalletData.amount) + newTransactionAmount
          : parseInt(newWalletData.amount) - newTransactionAmount;

      await updateWalletBalance(newWalletId, updatedNewWalletAmount);
    }

    // Log wallet transaction
    await logWalletTransaction(
      transactionId,
      newWalletId,
      type,
      action_date,
      userId,
      oldWalletAmount,
      newTransactionAmount
    );
  };

  // Helper function to update wallet balance
  const updateWalletBalance = async (walletId, newAmount) => {
    const { error } = await supabase
      .from("wallet")
      .update({ amount: newAmount })
      .eq("id", walletId);
    if (error) throw new Error(error.message);
  };

  // Helper function to log wallet transactions
  const logWalletTransaction = async (
    transactionId,
    walletId,
    type,
    action_date,
    userId,
    beforeAmount,
    transactionAmount
  ) => {
    const afterAmount =
      type === "income"
        ? beforeAmount + transactionAmount
        : beforeAmount - transactionAmount;

    const { error } = await supabase
      .from("wallet_transaction_log")
      .update({
        action_date,
        user_id: userId,
        wallet_id: walletId,
        type,
        before_amount: beforeAmount,
        transaction_amount: transactionAmount,
        after_amount: afterAmount,
      })
      .eq("transaction_id", transactionId);

    if (error) throw new Error(error.message);
  };

  // Helper function to update budget
  const updateBudget = async (
    transactionData,
    newCategoryId,
    newAmount,
    userId
  ) => {
    const oldCategoryId = transactionData.categories.id;
    const oldTransactionAmount = parseInt(transactionData.amount);
    const newTransactionAmount = parseInt(newAmount);
    const currentDate = new Date().toISOString();

    if (oldCategoryId === newCategoryId) {
      // Update the same budget
      await adjustBudget(
        newCategoryId,
        userId,
        oldTransactionAmount,
        newTransactionAmount,
        currentDate
      );
    } else {
      // Restore old budget
      await adjustBudget(
        oldCategoryId,
        userId,
        oldTransactionAmount,
        0,
        currentDate
      );

      // Update new budget
      await adjustBudget(
        newCategoryId,
        userId,
        0,
        newTransactionAmount,
        currentDate
      );
    }
  };

  // Helper function to adjust budget amounts
  const adjustBudget = async (
    categoryId,
    userId,
    oldAmount,
    newAmount,
    currentDate
  ) => {
    const { data: budgetData, error } = await supabase
      .from("budget")
      .select("id, spend_amount, usage, remaining_amount")
      .eq("user_id", userId)
      .eq("budget_categories.category_id", categoryId)
      .gte("expired_at", currentDate)
      .maybeSingle();

    if (error) throw new Error(error.message);
    if (!budgetData) return;

    const updatedSpendAmount =
      parseInt(budgetData.spend_amount ?? 0) - oldAmount + newAmount;
    const updatedUsage = parseInt(budgetData.usage) - oldAmount + newAmount;
    const updatedRemainingAmount =
      parseInt(budgetData.remaining_amount) + oldAmount - newAmount;

    const { error: budgetUpdateError } = await supabase
      .from("budget")
      .update({
        spend_amount: updatedSpendAmount,
        usage: updatedUsage,
        remaining_amount: updatedRemainingAmount,
      })
      .eq("id", budgetData.id);

    if (budgetUpdateError) throw new Error(budgetUpdateError.message);
  };

  return {
    updateTransaction
  }
});
