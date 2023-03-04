package edu.eci.arsw.blueprints.filters.impl;

import edu.eci.arsw.blueprints.filters.BlueprintFilter;
import edu.eci.arsw.blueprints.model.Blueprint;
import org.springframework.stereotype.Service;

@Service
public class RedundancyFiltering implements BlueprintFilter {

    @Override
    public void filter(Blueprint bp) {
        try {
            int size = bp.getPoints().size();
            for (int i = 0; i < size - 1; i++) {
                if (bp.getPoints().get(i).equals(bp.getPoints().get(i + 1))) {
                    bp.getPoints().remove(i);
                    size--;
                    i--;
                }
            }
        } catch (NullPointerException ignored) {

        }
    }
}
