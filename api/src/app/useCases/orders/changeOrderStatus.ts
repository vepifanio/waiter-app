import { Request, Response } from "express";
import { Order } from "../../models/Order";

export async function changeOrderStatus(req: Request, res: Response) {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const possibleStatus = ["WAITING", "IN_PRODUCTION", "DONE"];

    if (!possibleStatus.includes(status)) {
      return res.status(400).json({
        error: `Status should be one of these: ${possibleStatus.join(", ")}.`,
      });
    }

    await Order.findByIdAndUpdate(orderId, { status });

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
}
