Ouvre toute page de chapitre ou de TD. Remplace le trio fil d'Ariane + titre + `SectionLead` posés séparément.

```jsx
<ChapterHeader breadcrumb={<Breadcrumb items={…} />} title="Pourquoi mesurer ?"
  meta={<><Badge>CM 01</Badge><Badge tone="violet">Section 1.2</Badge><span>mis à jour le 17 août 2026</span></>}
  actions={<Button size="sm" variant="outline">Poly PDF</Button>}>
  Cette section fait la transition vers votre future profession…
</ChapterHeader>
```

`SectionLead` reste utile pour le chapeau d'une sous-section à l'intérieur de la page.
