
export const getTagColor = (toolTags: any[], tag: string) => {
    let m = toolTags.find((t) => t.tag === tag)
    if (m) {
        return m.tagColor
    }
    return;
}