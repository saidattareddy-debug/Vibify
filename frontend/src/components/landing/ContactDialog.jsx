import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { toast } from "sonner";
import { m as motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { submitContact, submitBooking } from "../../lib/api";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const ContactDialog = ({ open, onOpenChange, mode = "contact" }) => {
  const isBooking = mode === "booking";
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please tell us your name";
    if (!isEmail(form.email)) er.email = "Enter a valid email";
    if (!form.message.trim()) er.message = isBooking ? "What are your goals?" : "Tell us a bit about your project";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const reset = () => {
    setForm({ name: "", email: "", company: "", message: "" });
    setErrors({});
    setDone(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      if (isBooking) {
        await submitBooking({ name: form.name, email: form.email, company: form.company, goal: form.message });
      } else {
        await submitContact({ name: form.name, email: form.email, company: form.company, message: form.message });
      }
      setDone(true);
      toast.success(isBooking ? "Strategy call requested 🎉" : "Message sent — we'll be in touch!");
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (v) => {
    if (!v) setTimeout(reset, 250);
    onOpenChange(v);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        data-testid="contact-dialog"
        className="glass border-white/10 text-textPrimary sm:max-w-lg rounded-3xl"
      >
        {done ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-10 text-center"
            data-testid="contact-success"
          >
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-vibe-gradient glow-violet">
              <Check className="h-8 w-8 text-white" />
            </div>
            <h3 className="font-display text-3xl">You're in.</h3>
            <p className="mt-3 text-textMuted">
              {isBooking
                ? "Your strategy call request is logged. Our team will reach out within 24 hours."
                : "Thanks for reaching out. We'll get back to you within one business day."}
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-3xl tracking-tight">
                {isBooking ? "Book a free strategy call" : "Let's talk"}
              </DialogTitle>
              <DialogDescription className="text-textMuted">
                {isBooking
                  ? "Tell us where you want to go. We'll map the path to get there."
                  : "Tell us about your brand and what you want the world to notice."}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={submit} className="space-y-4 pt-2" noValidate>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" error={errors.name}>
                  <Input
                    data-testid="contact-name-input"
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Alex Rivera"
                    className="bg-white/5 border-white/10 focus-visible:ring-violet"
                  />
                </Field>
                <Field label="Email" error={errors.email}>
                  <Input
                    data-testid="contact-email-input"
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@brand.com"
                    className="bg-white/5 border-white/10 focus-visible:ring-violet"
                  />
                </Field>
              </div>
              <Field label="Company (optional)">
                <Input
                  data-testid="contact-company-input"
                  value={form.company}
                  onChange={update("company")}
                  placeholder="Brand Inc."
                  className="bg-white/5 border-white/10 focus-visible:ring-violet"
                />
              </Field>
              <Field label={isBooking ? "Your goals" : "Project details"} error={errors.message}>
                <Textarea
                  data-testid="contact-message-input"
                  value={form.message}
                  onChange={update("message")}
                  rows={4}
                  placeholder={isBooking ? "We want to 3x our launch reach..." : "We're launching a new product and need buzz..."}
                  className="bg-white/5 border-white/10 focus-visible:ring-violet resize-none"
                />
              </Field>
              <button
                data-testid="contact-submit-button"
                type="submit"
                disabled={loading}
                className="group relative w-full overflow-hidden rounded-full bg-vibe-gradient px-6 py-3.5 font-semibold text-white glow-violet transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-4 w-4" />}
                  {loading ? "Sending..." : isBooking ? "Request my call" : "Send message"}
                </span>
              </button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

const Field = ({ label, error, children }) => (
  <div className="space-y-1.5">
    <Label className="text-sm text-textMuted">{label}</Label>
    {children}
    {error && <p className="text-xs text-magenta" data-testid="field-error">{error}</p>}
  </div>
);

export default ContactDialog;
