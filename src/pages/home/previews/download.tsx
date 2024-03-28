import { Button, HStack } from "@hope-ui/solid"
import { useCopyLink, useT, useRouter } from "~/hooks"
import { objStore } from "~/store"
import { FileInfo } from "./info"
import { OpenWith } from "../file/open-with"
import { Show } from "solid-js"
import { fsRename, fsRemove } from "~/utils"
export const Download = (props: { openWith?: boolean }) => {
  const t = useT()
  const { copyCurrentRawLink } = useCopyLink()
  console.log(objStore)
  const { pathname } = useRouter()
  const { to } = useRouter()
  const isRawHide = () => {
    const raw_url = objStore.raw_url
    console.log(raw_url)
    if (raw_url) {
      const hide = raw_url.includes("_hide")
      console.log(`find hide: ${hide}`)
      return hide
    }
    return false
  }

  if (isRawHide()) {
    console.log("show raw hide button")
    return (
      <FileInfo>
        <HStack spacing="$2">
          <Button colorScheme="accent" onClick={() => copyCurrentRawLink(true)}>
            {t("home.toolbar.copy_link")}
          </Button>
          <Button as="a" href={objStore.raw_url} target="_blank">
            {t("home.preview.download")}
          </Button>
          <Button
            colorScheme="success"
            onClick={() => {
              let path = pathname()
              let name = objStore.obj.name
              console.log(`path: ${path}`)
              console.log(`name: ${name}`)
              fsRename(path, name.replace("_hide", ""))
              // redirect to the new path
              path = path.replace(name, name.replace("_hide", ""))
              console.log(`new path: ${path}`)
              to(path)
            }}
          >
            通过
          </Button>
          <Button
            colorScheme="danger"
            onClick={async () => {
              let path = pathname().replace(objStore.obj.name, "")
              let filename = [objStore.obj.name]
              fsRemove(path, filename)
              to(path)
            }}
          >
            拒绝
          </Button>
        </HStack>
        <Show when={props.openWith}>
          <OpenWith />
        </Show>
      </FileInfo>
    )
  } else {
    return (
      <FileInfo>
        <HStack spacing="$2">
          <Button colorScheme="accent" onClick={() => copyCurrentRawLink(true)}>
            {t("home.toolbar.copy_link")}
          </Button>
          <Button as="a" href={objStore.raw_url} target="_blank">
            {t("home.preview.download")}
          </Button>
          <rawHideButton />
        </HStack>
        <Show when={props.openWith}>
          <OpenWith />
        </Show>
      </FileInfo>
    )
  }
}

export default Download
