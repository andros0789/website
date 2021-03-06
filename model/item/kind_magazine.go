package item

const (
	KindMagazine Kind = "magazine"
)

type Magazine struct {
	Item `bson:",inline"`

	Capacity      int64            `json:"capacity"`
	Caliber       string           `json:"caliber"`
	Ergonomics    float64          `json:"ergonomicsFP"`
	Modifier      MagazineModifier `json:"modifier"`
	GridModifier  GridModifier     `json:"gridModifier"`
	Compatibility ItemList         `json:"compatibility"`
}

type MagazineModifier struct {
	CheckTime  float64 `json:"checkTime"`
	LoadUnload float64 `json:"loadUnload"`
}

type MagazineResult struct {
	Count int64      `json:"total"`
	Items []Magazine `json:"items"`
}

func (r *MagazineResult) GetCount() int64 {
	return r.Count
}

func (r *MagazineResult) GetEntities() []Entity {
	e := make([]Entity, len(r.Items))
	for i, item := range r.Items {
		e[i] = item
	}

	return e
}
