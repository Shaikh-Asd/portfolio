import { useState } from "react";
import { m } from "framer-motion";
import { Loader2, Send } from "lucide-react";
import { contactLinks } from "@/lib/data";
import { contactIcons } from "@/lib/icons";
import { sendContactEmail } from "@/lib/email";
import { fadeUp, smoothEase, staggerContainer, viewportOnce } from "@/lib/animations";
import { Button, GlassCard } from "@/components/ui";
import { Section } from "@/components/Section";

const formFields = [
  { id: "name", label: "Name", type: "text", required: true, placeholder: "Your name" },
  { id: "email", label: "Email", type: "email", required: true, placeholder: "you@company.com" },
  { id: "company", label: "Company", type: "text", placeholder: "Your company" },
  {
    id: "budget",
    label: "Budget",
    type: "select",
    options: [
      { value: "", label: "Select budget range" },
      { value: "under-5k", label: "Under $5,000" },
      { value: "5k-10k", label: "$5,000 – $10,000" },
      { value: "10k-25k", label: "$10,000 – $25,000" },
      { value: "25k-plus", label: "$25,000+" },
    ],
  },
];

function FormInput({ field, disabled }) {
  const className =
    "input-field w-full rounded-xl px-4 py-3 text-sm placeholder:text-muted/60 disabled:cursor-not-allowed disabled:opacity-60";

  if (field.type === "select") {
    return (
      <select id={field.id} name={field.id} disabled={disabled} className={className}>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      id={field.id}
      name={field.id}
      type={field.type}
      required={field.required}
      disabled={disabled}
      className={className}
      placeholder={field.placeholder}
    />
  );
}

export function Contact() {
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      await sendContactEmail(data);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email directly."
      );
    }
  };

  const isSending = status === "sending";

  return (
    <Section
      id="contact"
      header={{
        label: "Contact",
        title: "Let's Build Something Amazing Together",
        description:
          "Whether you need a website, mobile application, SaaS platform, admin dashboard, or backend system, I'd love to discuss your project.",
      }}
    >
      <div className="grid gap-6 lg:grid-cols-5 lg:gap-8">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:col-span-2 lg:grid-cols-1"
        >
          {contactLinks.map((link) => {
            const Icon = contactIcons[link.icon];
            return (
              <m.a
                key={link.label}
                variants={fadeUp}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                whileHover={{ x: 4, scale: 1.02 }}
                className="glass group flex min-w-0 items-center gap-3 rounded-xl p-3.5 transition-colors hover:border-accent/30 sm:gap-4 sm:p-4"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg icon-box sm:h-10 sm:w-10">
                  <Icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium tracking-wider text-muted uppercase">
                    {link.label}
                  </p>
                  <p className="break-all text-sm font-medium text-foreground sm:break-normal sm:truncate">
                    {link.value}
                  </p>
                </div>
              </m.a>
            );
          })}
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: smoothEase }}
          className="lg:col-span-3"
        >
          <GlassCard hover={false} spotlight={false} className="p-4 sm:p-6 md:p-8">
            {status === "success" ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
                  <Send className="h-7 w-7 text-emerald-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-muted">
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
              </div>
            ) : (
              <m.form
                onSubmit={handleSubmit}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="space-y-4 sm:space-y-5"
              >
                <m.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {formFields.slice(0, 2).map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-foreground">
                        {field.label}
                      </label>
                      <FormInput field={field} disabled={isSending} />
                    </div>
                  ))}
                </m.div>
                <m.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                  {formFields.slice(2).map((field) => (
                    <div key={field.id}>
                      <label htmlFor={field.id} className="mb-1.5 block text-sm font-medium text-foreground">
                        {field.label}
                      </label>
                      <FormInput field={field} disabled={isSending} />
                    </div>
                  ))}
                </m.div>
                <m.div variants={fadeUp}>
                  <label htmlFor="details" className="mb-1.5 block text-sm font-medium text-foreground">
                    Project Details
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={5}
                    required
                    disabled={isSending}
                    className="input-field w-full resize-none rounded-xl px-4 py-3 text-sm placeholder:text-muted/60 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="Tell me about your project..."
                  />
                </m.div>

                {status === "error" && (
                  <m.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-400"
                    role="alert"
                  >
                    {error}
                  </m.p>
                )}

                <m.div variants={fadeUp}>
                  <Button type="submit" disabled={isSending} className="w-full sm:w-auto">
                    {isSending ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </Button>
                </m.div>
              </m.form>
            )}
          </GlassCard>
        </m.div>
      </div>
    </Section>
  );
}
