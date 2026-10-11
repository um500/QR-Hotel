"use client";

import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { Plus, Pencil } from "lucide-react";
import { createFoodItem, updateFoodItem } from "@/lib/actions/foodItems";
import { initialFormState } from "@/lib/form-state";
import type { FoodItem } from "@/lib/sanity/types";
import Modal from "@/components/Modal";
import {
  Field,
  TextInput,
  TextArea,
  PrimaryButton,
  SecondaryButton,
  FormError,
  IconButton,
} from "@/components/ui";

const CATEGORIES = ["Starters", "Main Course", "Beverages", "Desserts", "Snacks"];

function Toggle({
  name,
  label,
  helper,
  defaultChecked,
}: {
  name: string;
  label: string;
  helper: string;
  defaultChecked: boolean;
}) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between rounded-lg border border-line bg-paper px-3.5 py-3">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        <p className="text-xs text-ink-dim">{helper}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => setChecked((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
          checked ? "bg-brand" : "bg-line"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
      <input type="hidden" name={name} value={checked ? "on" : "off"} />
    </div>
  );
}

function FoodItemFields({ item }: { item?: FoodItem }) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <Field label="Item Name" htmlFor="name">
        <TextInput id="name" name="name" placeholder="e.g. Club Sandwich" defaultValue={item?.name} required />
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field label="Category" htmlFor="category">
          <TextInput
            id="category"
            name="category"
            list="food-categories"
            placeholder="Main Course"
            defaultValue={item?.category}
            required
          />
          <datalist id="food-categories">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} />
            ))}
          </datalist>
        </Field>
        <Field label="Price (₹)" htmlFor="price">
          <TextInput
            id="price"
            name="price"
            type="number"
            min={0}
            step="1"
            placeholder="250"
            defaultValue={item?.price}
            required
          />
        </Field>
      </div>
      <Field label="Description" htmlFor="description" optional>
        <TextArea
          id="description"
          name="description"
          rows={2}
          placeholder="e.g. Grilled chicken, cheese, served with fries."
          defaultValue={item?.description}
        />
      </Field>
      <Toggle
        name="veg"
        label="Vegetarian?"
        helper="Shows a green mark instead of a red one."
        defaultChecked={item?.veg ?? true}
      />
      <Toggle
        name="available"
        label="Available?"
        helper="Turn off to hide from today's room-service menu."
        defaultChecked={item?.available ?? true}
      />
    </div>
  );
}

export function AddFoodItemModal() {
  const [open, setOpen] = useState(false);
  const [state, formAction] = useFormState(createFoodItem, initialFormState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
      setOpen(false);
    }
  }, [state]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-hover"
      >
        <Plus size={16} />
        Add Food Item
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Add Food Item">
        <form ref={formRef} action={formAction} className="flex flex-col gap-4">
          <FoodItemFields />
          <FormError message={state.error} />
          <div className="mt-1 flex justify-end gap-2">
            <SecondaryButton onClick={() => setOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton pendingLabel="Adding…">Add</PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}

export function EditFoodItemModal({ item }: { item: FoodItem }) {
  const [open, setOpen] = useState(false);
  const boundAction = updateFoodItem.bind(null, item._id);
  const [state, formAction] = useFormState(boundAction, initialFormState);

  useEffect(() => {
    if (state.success) setOpen(false);
  }, [state]);

  return (
    <>
      <IconButton aria-label={`Edit ${item.name}`} onClick={() => setOpen(true)}>
        <Pencil size={14} />
      </IconButton>

      <Modal open={open} onClose={() => setOpen(false)} title="Edit Food Item">
        <form action={formAction} className="flex flex-col gap-4">
          <FoodItemFields item={item} />
          <FormError message={state.error} />
          <div className="mt-1 flex justify-end gap-2">
            <SecondaryButton onClick={() => setOpen(false)}>Cancel</SecondaryButton>
            <PrimaryButton pendingLabel="Saving…">Save</PrimaryButton>
          </div>
        </form>
      </Modal>
    </>
  );
}
