import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from "@radix-ui/react-dialog";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Check, Loader2, X } from "lucide-react";
import { useForm } from 'react-hook-form';
import unorm from 'unorm';
import { z } from 'zod';
import { Button } from "./ui/button";

const createTagSchema = z.object({
  title: z.string().min(3, { message: "tag must have at least 3 chars" }),
})

function slugify(input: string): string {
  const normalizedString = unorm.nfd(input).replace(/[\u0300-\u036f]/g, '')
  const slug = normalizedString.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
  return slug
}

type CreateTagSchema = z.infer<typeof createTagSchema>

export function TagForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState
  } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema)
  })
  const queryClient = useQueryClient()

  const slug = watch('title')
  ? slugify(watch('title'))
  : ''

  const { mutateAsync } = useMutation({
    mutationFn: async ({ title }: CreateTagSchema) => {
      await fetch('http://localhost:3333/tags', {
        method: 'POST',
        body: JSON.stringify({
          title,
          amountOfVideos: 0,
          slug
        })
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-tags']
      })
    }
  })

  async function createTag({ title }: CreateTagSchema) {
    await mutateAsync({ title })
  }

  return (
    <form className="w-full space-y-6" onSubmit={handleSubmit(createTag)}>
      <div className="space-y-2">
        <label htmlFor="name" className="block text-sm font-medium">Tag name</label>
        <input
          { ...register('title') }
          id="name"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
        />
        {
          formState.errors?.title && (
            <p className='text-sm text-red-400'>
              {formState.errors.title.message}
            </p>
          )
        }
      </div>
      <div className="space-y-2">
        <label htmlFor="slug" className="block text-sm font-medium">Slug</label>
        <input
          id="slug"
          type="text"
          value={slug}
          className="border border-zinc-800 rounded-lg px-3 py-2.5 bg-zinc-800/50 w-full text-sm"
          readOnly
        />
      </div>
  
      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3"/>
            Cancel
          </Button>
        </Dialog.Close>
        <Button disabled={formState.isSubmitting} className="bg-teal-400 text-teal-950" type="submit">
          {
            formState.isSubmitting
            ? <Loader2 className='size-3 animate-spin' />
            : <Check className="size-3"/>
          }
          Save 
        </Button>
      </div>
    </form>
  )
}
