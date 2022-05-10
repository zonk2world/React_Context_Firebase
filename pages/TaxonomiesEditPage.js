import {useParams} from "react-router-dom";
import {useCallback, useEffect} from "react";
import {useTaxonomy} from "../hooks/useTaxonomy";
import {Box, Button} from "@material-ui/core";

const TaxonomiesEditPage = () => {
  const { taxonomyId } = useParams();
  const { taxonomy, save, refresh } = useTaxonomy({ id: taxonomyId });

  useEffect(refresh, []);

  const handleSave = useCallback(() => {
    return save({
      tags: [{
        id: "construction",
        name: "Construction Industry",
        summary: "A summary",
        translations: {
          de: {
            name: "Bauindustrie",
            summary: "Eine Beschreibung"
          }
        }
      }, {
        id: "retail",
        name: "Retail",
        summary: "A summary",
        translations: {
          de: {
            name: "Handel",
            summary: "Eine Beschreibung"
          }
        }
      }]
    });
  }, [save]);

  console.log(taxonomy);

  return (
    <Box>
      <Button onClick={handleSave}>Save</Button>
    </Box>
  );
};

export default TaxonomiesEditPage;