import { clerkClient } from "@clerk/express";


// Middleware to check userID and hasPremiumPlan

export const auth = async(req, res, next)=>{
    try {
        // `@clerk/express` attaches auth info to the request via `clerkMiddleware()`.
        // Depending on version, `req.auth` may be an object or a function returning an object.
        const authState =
          typeof req.auth === "function" ? await req.auth() : req.auth;

        const userId = authState?.userId;
        const has = authState?.has;

        if (!userId) {
          return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const hasPremiumPlan =
          typeof has === "function" ? await has({ plan: "premium" }) : false;

        let user;
        console.log("[auth] userId from token:", userId);
        try {
          user = await clerkClient.users.getUser(userId);
        } catch (e) {
          console.error("[auth] clerkClient.users.getUser failed:", e.message, e.statusCode ?? e.code);
          // Most commonly caused by using a CLERK_SECRET_KEY from a different Clerk instance
          // than the publishable key used by the frontend, or a deleted user.
          return res
            .status(401)
            .json({ success: false, message: "User not found" });
        }

        const freeUsage = Number(user?.privateMetadata?.free_usage ?? 0);

        if (!hasPremiumPlan) {
          req.free_usage = freeUsage;
        } else {
          // Premium users don't consume free usage; keep metadata normalized.
          if (freeUsage !== 0) {
            await clerkClient.users.updateUserMetadata(userId, {
              privateMetadata: { free_usage: 0 },
            });
          }
          req.free_usage = 0;
        }

        req.plan = hasPremiumPlan ? "premium" : "free";
        req.userId = userId;

        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
};