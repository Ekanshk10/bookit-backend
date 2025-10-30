import prisma from "../config/prisma.config.js";

export const getPromoCodes = async (req, res) => {
  try {
    const codes = await prisma.promoCode.findMany({
      select: {
        id: true,
        code: true,
        amount: true,
        discountType: true,
        minBookingValue: true,
        expiryDate: true,
        usageLimit: true,
        usedCount: true,
      },
    });

    if (codes.length > 0) {
      return res
        .status(200)
        .json({ message: "Promo Codes Fetched successfully", data: codes });
    }

    return res.status(404).json({ message: "No Promo Codes to fetch" });
  } catch (error) {
    console.error("Server Side Error fetching Promo Codes: ", error.message);
    return res.status(500).json({ message: "Error retriving Promo Codes" });
  }
};



export const promoValidate = async (req, res) => {
  try {
    const { code, bookingValue } = req.body;

    if (!code || !bookingValue)
      return res.status(400).json({
        message: "Promo code and booking value are required",
      });

    const sanitaizedCode = code.trim().toUpperCase();

    const isCodeAvailiable = await prisma.promoCode.findUnique({
      where: {
        code: sanitaizedCode,
      },
      select: {
        id: true,
        code: true,
        amount: true,
        discountType: true,
        minBookingValue: true,
        expiryDate: true,
        usageLimit: true,
        usedCount: true,
      },
    });

     if (!isCodeAvailiable) {
      return res.status(404).json({message: "Invalid promo code" });
    }
    if (
      isCodeAvailiable.expiryDate &&
      isCodeAvailiable.expiryDate < new Date()
    ) {
      return res.status(400).json({ message: "Promo code has expired" });
    }

    if (bookingValue < isCodeAvailiable.minBookingValue) {
      return res.status(400).json({
        message: `Minimum booking value must be ₹${isCodeAvailiable.minBookingValue}`,
      });
    }

    if (isCodeAvailiable.usageLimit && isCodeAvailiable.usedCount >= isCodeAvailiable.usageLimit) {
      return res.status(400).json({
        success: false,
        message: "Promo code usage limit reached",
      });
    }

    let discount = 0;
    if (isCodeAvailiable.discountType === "PERCENTAGE") {
      discount = (bookingValue * isCodeAvailiable.amount) / 100;
    } else if (isCodeAvailiable.discountType === "FLAT") {
      discount = isCodeAvailiable.amount;
    }


    const finalPrice = bookingValue - discount;
    const effectiveDiscount = Math.min(discount, bookingValue);
    
    return res.status(200).json({
      message: "Promo code applied successfully",
      data: {
        codeId: isCodeAvailiable.id,
        code: isCodeAvailiable.code,
        discountType: isCodeAvailiable.discountType,
        discountValue: isCodeAvailiable.amount,
        discount: effectiveDiscount,
        finalPrice: finalPrice.toFixed(2),
      },
    });
  } catch (error) {
    console.error("Server Side Error Validateing Promo Code: ", error.message);
    return res.status(500).json({ message: "Error Validating Promo Code" });
  }
};
